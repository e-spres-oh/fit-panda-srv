import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Food from './food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import Photo from './photos/photo.entity';
import { PhotosController } from './photos/photos.controller';
import { PhotosService } from './photos/photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Photo])],
  controllers: [FoodsController, PhotosController],
  providers: [FoodsService, PhotosService],
})
export class FoodsModule {}
