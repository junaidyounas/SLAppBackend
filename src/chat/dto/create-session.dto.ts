import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/auth.schema';
import { Post } from 'src/posts/schemas/post.schema';

export class createSessionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastMessage: string;

  @IsEmpty()
  senderId: User;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  postId: Post;

  @IsNotEmpty()
  @ApiProperty()
  receiverId: User;

  @IsEmpty()
  createdAt: Date;

  @IsOptional()
  @ApiProperty({ default: false })
  isDeleted: boolean;

  @IsOptional()
  @ApiProperty({ default: false })
  isSelling: boolean;

  @ApiProperty()
  @IsOptional()
  updatedAt: Date;
}
