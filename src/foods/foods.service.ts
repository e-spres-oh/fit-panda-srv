import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Food from './food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  async findAll() {
    return this.foodsRepository.find();
  }

  async findOne(id: number) {
    return this.foodsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.foodsRepository.delete(id);
  }

  async create(food: Omit<Food, 'id'>) {
    return this.foodsRepository.save(food);
  }

  async update(id: number, food: Partial<Omit<Food, 'id'>>) {
    await this.foodsRepository.update(id, food);
    return this.foodsRepository.findOneBy({ id });
  }
}
