import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostParams, UpdatePostParams } from 'src/posts/utils/types';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(User) private userRepository: Repository<Post>,
    ) { }

    async getPosts() {
        const posts = await this.postRepository.find({ relations: ['user']});
        return posts;
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findOneBy({ id });
        if (!post) {
            throw new HttpException('Post Not Founded', HttpStatus.NOT_FOUND);
        }
        return post;
    }

    async createPost(id: number, postDetails: CreatePostParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException('User Not Founded', HttpStatus.NOT_FOUND);
        }
        const newPost = await this.postRepository.create({ ...postDetails, user });
        return this.postRepository.save(newPost);
    }

    async updatePost(id: number, postData: UpdatePostParams) {
        return await this.postRepository.update({ id }, { ...postData });
    }

    async deletePost(id: number) {
        return await this.postRepository.delete({ id });
    }
}
