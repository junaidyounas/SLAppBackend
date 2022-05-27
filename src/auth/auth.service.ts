import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoggedInUser } from 'src/types/LoggedInUser';
import { getJwtToken } from 'src/utils/getJWTToken';
import { CreateOtpDto } from './dtos/create-otp.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ResetPassDto } from './dtos/reset-password.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { User } from './schemas/auth.schema';

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

      const unHashedPassword = await bcrypt.compare(password, user.password);
      if (!unHashedPassword) {
        throw new UnauthorizedException('Invalid username or password');
      }

    const token = await getJwtToken(user._id, this.jwtService);
    return {
      _id: user._id,
      token,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }


  // Create Otp ==> /auth/createOtp
  async createOtp(createOtpDto: CreateOtpDto) {
    const { email } = createOtpDto;
    const user = await this.userModal.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('User not Found');
    }
    const code = 123456;
    const changedUser = await this.userModal.findByIdAndUpdate(
      user._id,
      {
        resetOtp: code,
        resetOtpCreatedAt: new Date(),
      },
      {
        new: true,
      },
    );
    return changedUser;
  }

  // Reset Password ==> /auth/resetPassword
  async resetPassword(resetPassDto: ResetPassDto) {
    const { email, password, otp } = resetPassDto;
    const user = await this.userModal.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('User not Found');
    }

    if (Number(otp) === Number(user.resetOtp)) {
      const hashedPass = await bcrypt.hash(password, 10);
      var changedUser = await this.userModal.findByIdAndUpdate(
        user._id,
        {
          resetOtp: null,
          resetOtpCreatedAt: null,
          password: hashedPass,
        },
        {
          new: true,
        },
      );
    }else{
      throw new BadRequestException('Wrong otp entered');
    }
    // hash Password
    
     return changedUser;

  }
}
