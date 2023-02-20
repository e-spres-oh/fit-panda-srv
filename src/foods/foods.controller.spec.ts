import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Food from './food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

describe('FoodController', () => {
  let controller: FoodsController;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(() => Promise.resolve([])),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
      providers: [
        FoodsService,
        { provide: getRepositoryToken(Food), useValue: mockRepository },
      ],
    }).compile();

    controller = app.get<FoodsController>(FoodsController);
  });

  describe('/foods', () => {
    it('should return all foods', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });
});
