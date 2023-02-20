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
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  async findAll(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  @Post()
  async create(@Body() food: Omit<Food, 'id'>): Promise<Food> {
    return this.foodsService.create(food);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Food> {
    const result = await this.foodsService.findOne(+id);
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
    const result = await this.foodsService.update(+id, food);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.foodsService.findOne(+id);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.foodsService.remove(+id);
  }
}
