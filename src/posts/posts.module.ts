import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './services/posts/posts.service';
import { PostsController } from './controllers/posts/posts.controller';
import { Module } from '@nestjs/common';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [TypeOrmModule.forFeature([Post, User])]
})
export class PostsModule {}
