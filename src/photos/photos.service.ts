import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Photo from './photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async findOne(id: number) {
    return this.photosRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.photosRepository.delete(id);
  }

  async create(food: Omit<Photo, 'id'>) {
    return this.photosRepository.save(food);
  }
}
