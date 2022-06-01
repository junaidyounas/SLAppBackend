import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/auth.schema';
import { Category } from 'src/categories/schema/category.schema';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  category: Category;
  
  @IsString()
  @ApiProperty()
  subCategory: string;

}
