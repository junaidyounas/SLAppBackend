import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpDto {
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
