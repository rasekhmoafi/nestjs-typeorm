import { UsersService } from 'src/users/services/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RefreshToken } from 'src/auth/utils/refresh-token';
import { User } from 'src/typeorm/entities/User';
import { sign, verify } from 'jsonwebtoken';

@Injectable({})
export class AuthService {
    private refreshTokens: RefreshToken[] = []

    constructor(
        private readonly usersService: UsersService
    ) {}

    async refresh(refreshStr: string): Promise<string | undefined> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if(!refreshToken) {
            return undefined
        }
        const user = await this.usersService.getUserById(refreshToken.userId);
        if(!user) {
            return undefined
        }
        const accessToken = {
            userId: refreshToken.userId
        }

        return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h'})
    }

    private retrieveRefreshToken(
        refreshStr: string
    ): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, process.env.REFFREH_SECRET)
            if( typeof decoded === 'string') {
                return undefined
            }
            return Promise.resolve(
                //fetch from database
                this.refreshTokens.find((token) => token.id === decoded.id)
            );
        } catch(e) {
            return undefined
        }
    }
    async login(
        username: string,
        password: string,
        values: { userAgent: string; ipAddress: string }
    ): Promise<{ accessTooken: string; refreshToken: string}> {
        const user = await this.usersService.findUserByUsername(username);
        if(!user) {
            // return undefined;
            throw new HttpException('User not founded', HttpStatus.NOT_FOUND) 
        }
        if(user.password !== password) {
            // return undefined;
            throw new HttpException('Password is not correct', HttpStatus.CONFLICT) 

        }
        return this.newRefreshAndAccessToken(user, values)
    }
    private async newRefreshAndAccessToken(
        user: User,
        values: { userAgent: string; ipAddress: string }
    ): Promise<{ accessTooken: string; refreshToken: string}> {
        const refreshObject = new RefreshToken({
            id: 
                this.refreshTokens.length === 0
                ? 0
                : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
            ...values,
            userId: user.id
        });
        //insert into database
        this.refreshTokens.push(refreshObject);
        return {
            refreshToken: refreshObject.sign(),
            accessTooken: sign(
                {
                    userId: user.id
                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: '1h'
                }
            )
        }
    }

    async logout(refreshStr): Promise<void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr)

        if(!refreshToken) {
            return;
        }
        //delete refreshtoken from db
        this.refreshTokens = this.refreshTokens.filter(
            (refreshToken) => refreshToken.id !== refreshToken.id,
        );
    }

    // async validateUser(username: string, password: string) {
    //     const userDB = await this.usersService.findUserByUsername(username)
    //     if(userDB && userDB.password == password) {
    //         console.log("user validation success");
    //         return userDB;
    //     }
    //     console.log("user validation failed");
        
    //     return null
    // }
}
