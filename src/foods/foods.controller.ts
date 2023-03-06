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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Between } from 'typeorm';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import Food, { CreateFoodDTO, UpdateFoodDTO } from './food.entity';
import { FoodQuery } from './food.queries';
import { FoodsService } from './foods.service';

@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  async findAll(@Query() { consumedAt }: FoodQuery): Promise<Food[]> {
    if (!consumedAt) {
      return this.foodsService.findAll();
    }

    console.log(consumedAt);
    return this.foodsService.findAll({
      consumedAt: Between(
        startOfDay(parseISO(consumedAt)),
        endOfDay(parseISO(consumedAt)),
      ),
    });
  }

  @Post()
  async create(@Body() food: CreateFoodDTO): Promise<Food> {
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
  async update(@Param('id') id: string, @Body() food: UpdateFoodDTO) {
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

  @Get('search/:barcode')
  async search(@Param('barcode') barcode: string) {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?code=${barcode}`,
    );
    return response.json();
  }
}
