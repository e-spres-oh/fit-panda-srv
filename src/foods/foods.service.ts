import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/jwt.strategy';
import { FindOptionsWhere, Repository } from 'typeorm';
import Food, { CreateFoodDTO, UpdateFoodDTO } from './food.entity';

@Injectable({ scope: Scope.REQUEST })
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
    @Inject(REQUEST)
    private request: Request & { user: CurrentUser },
  ) {}

  async findAll(query?: FindOptionsWhere<Food>) {
    return this.foodsRepository.find({
      where: {
        userId: this.request.user.id,
        ...query,
      },
      order: {
        consumedAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.foodsRepository.findOneBy({ id, userId: this.request.user.id });
  }

  async remove(id: number) {
    await this.foodsRepository.delete({ id, userId: this.request.user.id });
  }

  async create({ photoId, ...food }: CreateFoodDTO) {
    const { id } = await this.foodsRepository.save({
      ...food,
      userId: this.request.user.id,
    });
    return this.findOne(id) as Promise<Food>;
  }

  async update(id: number, food: UpdateFoodDTO) {
    await this.foodsRepository.update(
      { id, userId: this.request.user.id },
      food,
    );
    return this.foodsRepository.findOneBy({ id, userId: this.request.user.id });
  }
}
