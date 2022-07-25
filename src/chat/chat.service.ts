import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';
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
    const recId = new mongoose.Types.ObjectId(
      createSessionDto.receiverId.toString(),
    );
    const data = Object.assign(createSessionDto, {
      senderId: user._id,
      receiverId: recId,
    });

    const session = await this.chatModal.create(data);
    return session;
    // return data;
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
