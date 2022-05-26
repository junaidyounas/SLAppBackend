import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { User } from './schemas/auth.schema';
import * as bcrypt from 'bcryptjs';
import { getJwtToken } from 'src/utils/getJWTToken';
import { JwtService } from '@nestjs/jwt';
import { LoggedInUser } from 'src/types/LoggedInUser';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(signUpDto: SignUpUserDto): Promise<User> {
    const { name, phone, email, password } = signUpDto;
    const hashedPass = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModal.create({
        name,
        phone,
        email,
        password: hashedPass,
      });
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate email entered.');
      }
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoggedInUser> {
    const { email, password } = loginUserDto;
    const user = await this.userModal
      .findOne({ email: email })
      .select('+password');
    // console.log({email,user})

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    try {
      const unHashedPassword = await bcrypt.compare(password, user.password);
      if (!unHashedPassword) {
        throw new UnauthorizedException('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
    }

    const token = await getJwtToken(user._id, this.jwtService);
    return { _id: user._id, token, name: user.name, email: user.email, phone: user.phone};
  }
}
