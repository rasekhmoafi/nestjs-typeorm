import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { User } from 'src/typeorm/entities/User';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService
    },
    LocalStrategy
  ],
})
export class AuthModule {}
