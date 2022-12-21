import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({ example: "qwe123" })
    @IsNotEmpty()
    refreshToken: string
}