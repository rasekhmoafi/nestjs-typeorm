import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './typeorm/entities/Post';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nestjs_mysql', 
      entities: [User, Profile, Post],
      synchronize: true
    }),
    PostsModule,
    AuthModule,
    ConfigModule.forRoot() //to access .env file
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
 