import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  otp: number;

  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
