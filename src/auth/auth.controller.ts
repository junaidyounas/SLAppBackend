import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedInUser } from 'src/types/LoggedInUser';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dtos/create-otp.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ResetPassDto } from './dtos/reset-password.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { User } from './schemas/auth.schema';
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

  // google login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('/register-with-google_and_login')
  @ApiBody({ type: SignUpUserDto })
  async loginWithGoogleCredentials(
    @Body()
    signupDto: SignUpUserDto,
  ): Promise<any> {
    return this.authService.loginWithGoogleCred(signupDto);
  }

  @Post('/allFavIds')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  async getAllFavIds(@Req() req): Promise<any> {
    return this.authService.getAllFavIds(req.user);
  }
}
