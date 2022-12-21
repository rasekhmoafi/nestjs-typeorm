import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";


export class CreateUserDto {
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