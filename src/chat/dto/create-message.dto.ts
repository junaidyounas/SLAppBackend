import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schemas/auth.schema';
import { MessageType } from 'src/enum/MessageType.enum';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'text' })
  @IsOptional()
  @IsString()
  type: MessageType;

  @ApiProperty({ default: [] })
  @IsOptional()
  images: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  isRead: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  isDeleted: boolean;

  @ApiProperty()
  @IsOptional()
  createdAt: Date;

  @ApiProperty()
  senderId: User;

  @ApiProperty()
  receiverId: User;
}
