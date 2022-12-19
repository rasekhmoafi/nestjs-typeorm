import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';


export class UpdateUserDto {
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string
}