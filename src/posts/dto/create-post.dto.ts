import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
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
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: Category;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subCategory: string;

  @IsEmpty()
  readonly user: User
}
