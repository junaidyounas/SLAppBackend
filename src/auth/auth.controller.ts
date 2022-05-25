import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { User } from './schemas/auth.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUpUser(
        @Body()
        signupDto: SignUpUserDto
    ): Promise<User>{
        return this.authService.create(signupDto);
    }

    @Get('/login')
    async loginUser(
        @Body()
        loginUserDto: LoginUserDto
    ): Promise<User>{
        return this.authService.login(loginUserDto);
    }
}
