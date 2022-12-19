import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    users: any = [
        {username: 'rasekh', email: 'rasekh@gmail.com'},
        {username: 'John', email: 'rasekh@gmail.com'},
        {username: 'sali', email: 'rasekh@gmail.com'},
        {username: 'james', email: 'rasekh@gmail.com'},
    ]

    getUsers() {
        return this.users
    }
    getUserById(id: number) {
        const user = this.users[id]
        if(!user) {
            throw new HttpException("User Not Founded", HttpStatus.NOT_FOUND)
        }
        return user
    }
    createUser(user: CreateUserDto) {
        this.users.push(user)
        return 'created'
    }
}
