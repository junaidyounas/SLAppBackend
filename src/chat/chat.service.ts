import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { createSessionDto } from './dto/create-session.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatSession } from './schemas/session.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatSession.name)
    private chatModal: Model<ChatSession>,
  ) {}
  create(createSessionDto: createSessionDto) {
    return 'This action adds a new chat';
  }

  async createSession(createSessionDto: createSessionDto, user: User) {
    const receiverId = new mongoose.Types.ObjectId(
      createSessionDto.receiverId.toString(),
    );
    const postId = new mongoose.Types.ObjectId(
      createSessionDto.postId.toString(),
    );
    const data = Object.assign(createSessionDto, {
      senderId: user._id,
      receiverId,
      postId,
    });

    const checkFirst = await this.chatModal.findOne({
      senderId: user._id,
      receiverId,
      postId,
    });
    if (checkFirst) {
      throw new BadRequestException();
    }

    const session = await this.chatModal.create(data);
    return session;
    // return data;
  }

  // get all current user sessions
  async getAllCurrentUserChatSessions(user: User) {
    return await this.chatModal
      .find(
        {
          $or: [{ senderId: user.id }, { receiverId: user.id }],
        },
        { messages: { $slice: -1 } },
      )
      .populate('postId', [
        'title',
        'images',
        'isActive',
        'isVisible',
        'price',
      ]);
  }

  // send messages
  async sendMessage(createMessageDto: CreateMessageDto, id: string) {
    const sendMsg = await this.chatModal.update(
      { _id: id },
      { $push: { messages: createMessageDto } },
    );
    console.log(sendMsg);
    return sendMsg;
  }

  // find one session with _id
  async findOneSessionById(id: string) {
    return await this.chatModal
      .findOne({ _id: id }, { messages: { $slice: -1 } })
      .populate('postId', [
        'title',
        'images',
        'isActive',
        'isVisible',
        'price',
        'user',
      ])
      .populate({
        path: 'postId',
        populate: {
          path: 'user',
        },
      })
      .exec();
  }

  // get single chat messages
  async getChatMessages(id: string, query: Query) {
    const start = query.start ? Number(query.start) : 0;
    const end = query.end ? Number(query.end) : 20;
    console.log(start, end);
    return this.chatModal
      .findOne(
        { _id: id },
        {
          messages: {
            $slice: [
              {
                $reverseArray: '$messages',
              },
              start,
              end,
            ],
          },
        },
      )
      .populate('postId', [
        'title',
        'images',
        'isActive',
        'isVisible',
        'price',
      ]);
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
