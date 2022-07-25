import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/auth.schema';

export class createSessionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastMessage: string;

  @IsEmpty()
  senderId: User;

  @IsNotEmpty()
  @ApiProperty()
  receiverId: User;

  @IsEmpty()
  createdAt: Date;

  @IsOptional()
  isSelling: boolean;

  @ApiProperty()
  updatedAt: Date;
}
