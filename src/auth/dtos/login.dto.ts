import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: "rasekh" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "moafi" })
    @IsNotEmpty()
    password: string;
}
