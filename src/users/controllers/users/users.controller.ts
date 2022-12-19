import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPipePipe } from 'src/users/pipes/create-user-pipe/create-user-pipe.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.getUserById(userId)
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body(CreateUserPipePipe) userData: CreateUserDto) {
        return this.usersService.createUser(userData)
    }
}
