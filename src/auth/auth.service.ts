import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import mongoose, { Model } from 'mongoose';
import { LoggedInUser } from '../types/LoggedInUser';
import { CreateOtpDto } from './dtos/create-otp.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ResetPassDto } from './dtos/reset-password.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { User } from './schemas/auth.schema';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { getJwtToken } from '../utils/getJWTToken';
import { UpdateFavDto } from './dtos/updateFav.dto';

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
    try {
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
        favourites: user.favourites as any,
      };
    } catch (err) {
      if (err.code === 500) {
        throw new ConflictException('Incorrect username or password');
      }
    }
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

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { otp, email } = verifyOtpDto;
    const user = await this.userModal
      .findOne({ email: email })
      .select('+resetOtp')
      .select('+resetOtpCreatedAt');
    if (!user) {
      throw new BadRequestException('User not Found');
    }
    if (Number(otp) === Number(user.resetOtp)) {
      return { message: 'Successfully verified OTP.' };
    } else {
      throw new BadRequestException('Wrong otp entered');
    }
  }

  // Reset Password ==> /auth/resetPassword
  async resetPassword(resetPassDto: ResetPassDto) {
    const { email, password, otp } = resetPassDto;
    const user = await this.userModal
      .findOne({ email: email })
      .select('+resetOtp')
      .select('+resetOtpCreatedAt');
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
    } else {
      throw new BadRequestException('Wrong otp entered');
    }
    // hash Password

    return changedUser;
  }

  // google login
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  async loginWithGoogleCred(signUpDto: SignUpUserDto): Promise<LoggedInUser> {
    const { name, email } = signUpDto;
    const userFind = await this.userModal.findOne({ email });
    if (userFind) {
      const token = await getJwtToken(userFind._id, this.jwtService);
      return {
        _id: userFind._id,
        token,
        name: userFind.name,
        email: userFind.email,
        phone: userFind.phone,
        favourites: userFind.favourites as any,
      };
    } else {
      try {
        const user = await this.userModal.create({
          name,
          email,
        });
        const token = await getJwtToken(userFind._id, this.jwtService);
        return {
          _id: user._id,
          token,
          name: user.name,
          email: user.email,
          phone: undefined as any,
          favourites: userFind.favourites as any,
        };
      } catch (error) {
        if (error.code === 11000) {
          throw new ConflictException('Duplicate email entered.');
        }
      }
    }
  }

  // add post to favorite
  async postFav(updateFavDto: UpdateFavDto, user): Promise<any> {
    const { postId, isFav } = updateFavDto;
    const newV = 'favourites.' + postId;
    if (isFav == false) {
      const data = await this.userModal.findOneAndUpdate(
        { id: user._id },
        {
          $unset: { [newV]: isFav },
        },
      );
      return data;
    }
    const data = await this.userModal.findOneAndUpdate(
      { id: user._id },
      {
        $set: { [newV]: isFav },
      },
    );
    // https://stackoverflow.com/questions/55878704/mongo-db-design-for-user-favourites-pros-and-cons
    if (!data) {
      return 'There is some error';
    }
    return data;
  }

  async getFavouritePostsIds(user): Promise<any> {
    const id = new mongoose.Types.ObjectId(user._id);
    const userData = await this.userModal.findOne(id, {
      favourites: true,
    });
    const favouriteIds = userData.favourites;
    const keys = [...favouriteIds.keys()];

    return keys;
  }

  async getAllFavIds(user): Promise<any> {
    const id = new mongoose.Types.ObjectId(user._id);
    const userData = await this.userModal.findOne(id);
    return userData.favourites;
  }
}
