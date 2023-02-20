import { Controller, Get } from '@nestjs/common';
import Food from './entities/food.entity';
import { FoodService } from './food.service';

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }
}
