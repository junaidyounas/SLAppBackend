import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignUpUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail({}, {message: "Please enter a valid email"})
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}