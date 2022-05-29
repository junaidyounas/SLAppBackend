import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from 'src/types/LoggedInUser';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dtos/create-otp.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { User } from './schemas/auth.schema';
import { ResetPassDto } from './dtos/reset-password.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';



@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUpUser(
    @Body()
    signupDto: SignUpUserDto,
  ): Promise<User> {
    return this.authService.create(signupDto);
  }

  @Post('/login')
  @ApiCreatedResponse({ description: 'Data' })
  @ApiBody({ type: LoginUserDto })
  async loginUser(
    @Body()
    loginUserDto: LoginUserDto,
  ): Promise<LoggedInUser> {
    return this.authService.login(loginUserDto);
  }

  @Post('/create-otp')
  @ApiCreatedResponse({ description: 'Data' })
  @ApiBody({ type: CreateOtpDto })
  async createOtp(
    @Body()
    createOtpDto: CreateOtpDto,
  ): Promise<any> {
    return this.authService.createOtp(createOtpDto);
  }

  @Post('/reset-password')
  @ApiCreatedResponse({ description: 'Data' })
  @ApiBody({ type: ResetPassDto })
  async resetPassword(
    @Body()
    resetPassDto: ResetPassDto,
  ): Promise<any> {
    return this.authService.resetPassword(resetPassDto);
  }

  @Post('/verify-otp')
  @ApiCreatedResponse({ description: 'Data' })
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp(
    @Body()
    verifyOtpDto: VerifyOtpDto,
  ): Promise<any> {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}
