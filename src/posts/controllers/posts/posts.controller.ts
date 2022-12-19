import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Put } from '@nestjs/common/decorators';
import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body, ParseIntPipe } from '@nestjs/common';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { UpdatePostDto } from 'src/posts/dtos/UpdatePost.dto';
import { CreatePostDto } from 'src/posts/dtos/CreatePost.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService
    ) {}

    @Get()
    getPosts() {
        return this.postsService.getPosts()
    }

    @Get(':id')
    getPostById(@Param('id', ParseIntPipe) PostId: number) {
        return this.postsService.getPostById(PostId)
    }

    @Post(':id/create')
    @UsePipes(new ValidationPipe())
    createPost(@Param('id', ParseIntPipe) userId: number, @Body() postData: CreatePostDto) {
        return this.postsService.createPost(userId, postData)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updatePostById(@Param('id', ParseIntPipe) id: number, @Body() postData: UpdatePostDto) {
        this.postsService.updatePost(id, postData)
    }

    @Delete(':id')
    deletePost(@Param('id', ParseIntPipe) id: number) {
        this.postsService.deletePost(id)
    }
}
