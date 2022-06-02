import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/auth.schema';
import { CONDITION } from 'src/types/Condition.type';
import { Category } from '../../categories/schema/category.schema';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  condition: CONDITION

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category: Category;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  subCategory: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  images: string[]

  @IsEmpty()
  readonly user: User

}
