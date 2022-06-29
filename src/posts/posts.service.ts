import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import mongoose, { Model } from 'mongoose';
import { User } from '../auth/schemas/auth.schema';
import { isMongooseWrongId } from '..//utils/isMongooseWrongId';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const data = Object.assign(createPostDto, { user: user._id });

    const post = await this.postModel.create(data);

    return post;
  }

  async findAll(query: Query) {
    const search = query.search
      ? {
          title: {
            $regex: query.search,
            $options: 'i',
          },
        }
      : {};

    // pagination
    const resultPerPage = Number(process.env.POSTS_PER_PAGE);
    const currentPage = Number(query.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    return await this.postModel
      .find({ ...search })
      .limit(resultPerPage)
      .skip(skip);
  }

  async getAllMyPosts(currentUser) {
    return await this.postModel.find({ user: currentUser.id });
  }

  // ====> /:_id
  async findOne(id: string): Promise<Post> {
    const post = await this.postModel
      .findById(id)
      .populate('user')
      .populate('category', ['title']);
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, user): Promise<Post> {
    isMongooseWrongId(id);
    const post = await this.postModel.findById(id);
    if (post.user.toString() !== user._id.toString()) {
      throw new BadRequestException('Only owner of this post can update');
    }
    const updated = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
      runValidators: true,
    });
    return updated;
  }

  async remove(id: string) {
    isMongooseWrongId(id);
    const post = await this.postModel
      .findByIdAndRemove(id)
      .populate('user')
      .populate('category', ['title']);
    return post;
  }
}
