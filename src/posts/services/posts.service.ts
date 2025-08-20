import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }

  async findAll() {
    return await this.postsRepository.find({
      relations:['user.profile', 'categories' ],
    });
  }

  async findOne(requestedId: number) {
    return await this.findIfExists(requestedId);
  }

  async create(data: CreatePostDto) {
    try {
      const newPost = await this.postsRepository.save({
        ...data,
        user: {id: data.userId },
        categories: data.categoryIds?.map((id) => ({id}))
      });
      return await this.findIfExists(newPost.id);
    } catch (error) {
      console.log("Error: ", error);
      throw new BadRequestException('Error creating post');
    }
  }

  async remove(requestedId: number) {
    await this.findIfExists(requestedId);
    await this.postsRepository.delete({ id: requestedId });
    return {
      message: 'Post Deleted',
    };
  }

  async update(requestedId: number, changes: UpdatePostDto) {
    const post = await this.findIfExists(requestedId);
    const modifiedPost = await this.postsRepository.merge(post, changes);
    return await this.postsRepository.save(modifiedPost);
  }

  async findPostsByCategoryId(categoryId: number){

    return await this.postsRepository.find({
      where: {categories: { id: categoryId }},
      relations: ['user.profile'],
    })
  }

  private async findIfExists(requestedId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: requestedId },
      relations: [ 'user.profile', 'categories' ],
    });
    if (!post) {
      throw new NotFoundException(`Error, post con id ${requestedId} no existe`);
    }
    return post;
  }
}
