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

    const searchBrand = query.searchBrand
      ? {
          brand: {
            $regex: query.searchBrand,
            $options: 'i',
          },
        }
      : {};
    const landType = query.landType
      ? {
          landType: {
            $regex: query.landType,
            $options: 'i',
          },
        }
      : {};
    const areaUnit = query.areaUnit
      ? {
          areaUnit: query.areaUnit,
        }
      : {};
    const area = query.area
      ? {
          area: query.area,
        }
      : {};
    const searchYear = query.year
      ? {
          year: Number(query.year),
        }
      : {};
    const category = query.category
      ? {
          category: query.category,
        }
      : {};
    const subCategory = query.subCategory
      ? {
          subCategory: {
            $regex: query.subCategory,
            $options: 'i',
          },
        }
      : {};

    // const location =
    //   query.latitude && query.longitude
    //     ? {
    //         location: {
    //           $geoWithin: {
    //             $centerSphere: [
    //               [Number(query.longitude), Number(query.latitude)],
    //               Number(process.env.MILLS_AREA_COVER) / 3963.2,
    //             ],
    //           },
    //         },
    //       }
    //     : {};

    const location =
      query.latitude && query.longitude
        ? {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [
                    Number(query.longitude),
                    Number(query.latitude),
                  ],
                },
                $minDistance: 0,
                $maxDistance: 13000,
              },
            },
          }
        : {};

    const pricegt = query.pricegt
      ? {
          price: { $gt: query.pricegt },
        }
      : {};

    const pricelt = query.pricelt
      ? {
          price: { $lt: query.pricelt },
        }
      : {};
    const isFurnished = query.isFurnished
      ? {
          isFurnished: query.isFurnished,
        }
      : {};
    const rooms = query.rooms
      ? {
          rooms: { $gte: query.rooms },
        }
      : {};

    const bathrooms = query.bathrooms
      ? {
          bathrooms: { $gte: query.bathrooms },
        }
      : {};

    const kitchens = query.kitchens
      ? {
          kitchens: { $gte: query.kitchens },
        }
      : {};
    const make = query.make
      ? {
          make: {
            $regex: query.make,
            $options: 'i',
          },
        }
      : {};

    // pagination
    const resultPerPage = Number(process.env.POSTS_PER_PAGE);
    const currentPage = Number(query.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    return await this.postModel
      .find({
        ...search,
        ...category,
        ...subCategory,
        ...location,
        ...pricegt,
        ...pricelt,
        ...searchBrand,
        ...searchYear,
        ...landType,
        ...areaUnit,
        ...area,
        ...isFurnished,
        ...rooms,
        ...bathrooms,
        ...kitchens,
        ...make,
      })
      .limit(resultPerPage)
      .skip(skip)
      .sort({ createdAt: -1 });
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

  async allFavPosts(ids: string[]): Promise<any> {
    return await this.postModel.find({ _id: { $in: ids } });
  }
}
