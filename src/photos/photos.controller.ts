import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Photo from './photo.entity';
import { PhotosService } from './photos.service';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  async create(@Body() photo: Omit<Photo, 'id'>): Promise<Photo> {
    return this.photosService.create(photo);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Photo> {
    const result = await this.photosService.findOne(+id);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.photosService.findOne(+id);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.photosService.remove(+id);
  }
}
