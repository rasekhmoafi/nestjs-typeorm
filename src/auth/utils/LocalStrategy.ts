import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password)
        if(!user) throw new UnauthorizedException();
        return user;
    }
}