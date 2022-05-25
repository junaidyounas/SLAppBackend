import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { User } from './schemas/auth.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModal: Model<User>,
    ) {}

    async create(signUpDto: SignUpUserDto): Promise<User> {
        const {name, email, phone, password} = signUpDto;
        try{
            const user = await this.userModal.create({
                name, email, phone, password
            });
            return user;
        }catch(error){
            if(error.code === 11000){
                throw new ConflictException('Email already exists.')
            }
        }

    }

    async login(loginUserDto: LoginUserDto) : Promise<User>{
        const {email, password} = loginUserDto;
        const user = await this.userModal.findOne({email});
        return user;
    }
}
