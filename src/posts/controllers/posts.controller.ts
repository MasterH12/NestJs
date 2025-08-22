import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Payload } from 'src/auth/models/payload.model';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService) {}

  @ApiOperation({summary: "Create a new post"})
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as Payload;
    const userId = user.sub;
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Post(':id/publish')
  publish(@Param('id', ParseIntPipe) id: string, @Req() req: Request) {
    const user = req.user as Payload;
    const userId = user.sub;
    return this.postsService.publish(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.remove(+id);
  }
}
