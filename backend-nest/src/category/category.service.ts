import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID=${id} not found`);
    }
    return category;
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.repository.create(createCategoryDto);
    return this.repository.save(newCategory);
  }

  remove(id: number) {
    return this.findOne(id)
      .then((category) => this.repository.remove(category))
      .catch(() => {
        throw new NotFoundException(`Category with ID=${id} not found`);
      });
  }
}
