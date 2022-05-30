import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';
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

    const data = Object.assign(createPostDto, {user: user._id})

    const post = await this.postModel.create(data);

    return post;
  }

  async findAll(query: Query) {
    const search = query.search ? {
      title: {
        $regex: query.search,
        $options: 'i'
      }
    } : {}

    // pagination
    const resultPerPage = Number(process.env.POSTS_PER_PAGE);
    const currentPage = Number(query.page) || 1;
    const skip = resultPerPage * (currentPage - 1)

    return await this.postModel
    .find({ ...search })
    .limit(resultPerPage)
    .skip(skip);
  }

  // ====> /:_id
  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).populate('user');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
