import { UsersService } from 'src/users/services/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {

    constructor(
        private usersService: UsersService
    ) {}

    async validateUser(username: string, password: string) {
        const userDB = await this.usersService.findUserByUsername(username)
        if(userDB && userDB.password == password) {
            console.log("user validation success");
            return userDB;
        }
        console.log("user validation failed");
        
        return null
    }
}
