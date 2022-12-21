import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { User } from 'src/typeorm/entities/User';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy
  ],
})
export class AuthModule {}
