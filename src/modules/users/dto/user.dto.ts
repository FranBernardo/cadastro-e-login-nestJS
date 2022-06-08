/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
export class UserDto {
    @IsNotEmpty({
        message:'Nome obrigatorio'
    })
    name: string;

    @IsNotEmpty({
        message:'Nome obrigatorio'
    })
    @IsEmail()
     email: string;

    @IsNotEmpty({
        message:'Nome obrigatorio'
    })
    @MinLength(6)
    password: string;
}