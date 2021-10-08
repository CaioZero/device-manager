import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateCategoryDto} from './dto/create-category.dto';
import {Category} from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,
  ) {
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID=${id} not found`);
    }
    return category;
  }

  async remove(id: number) {
    return this.findOne(id)
        .then((category) => this.categoryRepository.remove(category))
        .catch(() => {
          throw new Error(`Category ${id} not found`);
        });
  }
}
