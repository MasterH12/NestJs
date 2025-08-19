import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(requestedId: number) {
    return await this.findIfExists(requestedId);
  }

  async create(data: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesRepository.save(data);
      return newCategory;
    } catch (error) {
      console.log("Error: ", error);
      throw new BadRequestException('Error creating category');
    }
  }

  async remove(requestedId: number) {
    await this.findIfExists(requestedId);
    await this.categoriesRepository.delete({ id: requestedId });
    return {
      message: 'Category Deleted',
    };
  }

  async update(requestedId: number, changes: UpdateCategoryDto) {
    const category = await this.findIfExists(requestedId);
    const modifiedCategory = await this.categoriesRepository.merge(category, changes);
    return await this.categoriesRepository.save(modifiedCategory);
  }

  private async findIfExists(requestedId: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id: requestedId }
    });
    if (!category) {
      throw new NotFoundException(`Error, categoría con id ${requestedId} no existe`);
    }
    return category;
  }
}