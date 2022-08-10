import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/auth.schema';
import { CONDITION } from '../../types/Condition.type';
import { Category } from '../../categories/schema/category.schema';
import { CreatePostDto } from './create-post.dto';
import { LocationType } from 'src/types/LocationType';

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
  condition: CONDITION;

  @IsOptional()
  @ApiProperty()
  location: LocationType;

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
  images: string[];

  @IsEmpty()
  readonly user: User;

  @IsOptional()
  @IsString()
  @ApiProperty()
  brand: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  make: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  year: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  type: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  landType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  deviceType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  areaUnit: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  area: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isFurnished: boolean;

  @IsOptional()
  createdAt: Date;
}
