import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Put, Req, UseGuards } from '@nestjs/common/decorators';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserPipePipe } from 'src/users/pipes/create-user-pipe/create-user-pipe.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() request) {
        const userId = request.user.userId;
        return this.usersService.getUserById(userId)
    }

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
        this.usersService.createUser(userData)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto) {
        this.usersService.updateUser(id, userData)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        this.usersService.deleteUser(id)
    }
}
