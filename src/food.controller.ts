import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import Food from './food.entity';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Post()
  async create(@Body() food: Omit<Food, 'id'>): Promise<Food> {
    return this.foodService.create(food);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Food> {
    const result = await this.foodService.findOne(+id);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() food: Partial<Omit<Food, 'id'>>,
  ) {
    const result = await this.foodService.update(+id, food);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.foodService.findOne(+id);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.foodService.remove(+id);
  }
}
