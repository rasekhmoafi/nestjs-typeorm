import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';


export class UpdateUserDto {
    @ApiProperty({ example: "rasekh" })
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({ example: "rasekh@gmail.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "123456" })
    @IsNotEmpty()
    password: string
}