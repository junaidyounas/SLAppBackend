import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isMongooseWrongId } from 'src/utils/isMongooseWrongId';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name)
    private categoryModal: Model<Category>
  ){}

  // create(
  //   createCategoryDto: CreateCategoryDto,
  //   ) {
  //   return 'This action adds a new category';
  // }

  async findAll(): Promise<Category[]> {
    return await this.categoryModal.find();
  }

  async findOne(id: string): Promise<Category> {
    isMongooseWrongId(id)
    const cat = await this.categoryModal.findById(id);
    if (!cat) {
      throw new BadRequestException('Category not Found');
    }
    return cat;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
