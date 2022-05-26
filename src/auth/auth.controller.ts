import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from 'src/types/LoggedInUser';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
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

  @Get('/login')
  async loginUser(
    @Body()
    loginUserDto: LoginUserDto,
  ): Promise<LoggedInUser> {
    return this.authService.login(loginUserDto);
  }
}
