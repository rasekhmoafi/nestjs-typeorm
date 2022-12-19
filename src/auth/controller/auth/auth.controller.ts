import { Controller } from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login() {

    }
}
