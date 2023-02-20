import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Food from './entities/food.entity';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

describe('AppController', () => {
  let controller: FoodController;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(() => Promise.resolve([])),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        FoodService,
        { provide: getRepositoryToken(Food), useValue: mockRepository },
      ],
    }).compile();

    controller = app.get<FoodController>(FoodController);
  });

  describe('/', () => {
    it('should return all foods', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });
});
