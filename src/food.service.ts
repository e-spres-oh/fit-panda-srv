import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Food from './entities/food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  findOne(id: number): Promise<Food> {
    return this.foodRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.foodRepository.delete(id);
  }
}
