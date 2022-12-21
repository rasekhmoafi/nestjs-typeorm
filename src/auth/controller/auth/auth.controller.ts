import { Controller, Req, Ip, Body, ValidationPipe } from '@nestjs/common';
import { Delete, Post, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RefreshTokenDto } from 'src/auth/dtos/refreshToken.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
        return this.authService.login(body.username, body.password, {
            ipAddress: ip,
            userAgent: request.headers['user-agent'],
        })
    }

    @Post('refresh') 
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.refresh(body.refreshToken);
    }

    @Delete('logout')
    async logout(@Body() body: RefreshTokenDto) {
        this.authService.logout(body.refreshToken)
    }
}
