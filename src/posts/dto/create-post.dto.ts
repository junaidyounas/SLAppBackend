import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CONDITION } from '../../types/Condition.type';
import { User } from '../../auth/schemas/auth.schema';
import { Category } from '../../categories/schema/category.schema';
import { LocationType } from 'src/types/LocationType';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  condition: CONDITION;

  @IsNotEmpty()
  @ApiProperty()
  location: LocationType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: Category;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subCategory: string;

  @IsArray()
  @IsNotEmpty()
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
  deviceType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  landType: string;

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
