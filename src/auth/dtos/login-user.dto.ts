import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginUserDto {


    @IsString()
    @IsEmail({}, {message: "Please enter a valid email"})
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}