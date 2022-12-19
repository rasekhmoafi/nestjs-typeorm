import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserParams, UpdateUserParams } from 'src/users/utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException('User Not Founded', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = await this.userRepository.create({
      ...userDetails,
      createdAt: new Date()
    });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, userData: UpdateUserParams) {
    return await this.userRepository.update({id}, {...userData});
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({id})
  }
}
