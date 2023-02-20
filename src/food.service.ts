import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Food from './food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async findAll() {
    return this.foodRepository.find();
  }

  async findOne(id: number) {
    return this.foodRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.foodRepository.delete(id);
  }

  async create(food: Omit<Food, 'id'>) {
    return this.foodRepository.save(food);
  }

  async update(id: number, food: Partial<Omit<Food, 'id'>>) {
    await this.foodRepository.update(id, food);
    return this.foodRepository.findOneBy({ id });
  }
}
