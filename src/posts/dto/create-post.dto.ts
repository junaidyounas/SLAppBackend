import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CONDITION } from "src/types/Condition.type";
import { User } from "../../auth/schemas/auth.schema";
import { Category } from "../../categories/schema/category.schema";

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
  @IsNotEmpty()
  @ApiProperty()
  condition: CONDITION

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

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
  images: string[]

  @IsEmpty()
  readonly user: User
}
