import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import Photo from './photo.entity';
import { PhotosService } from './photos.service';

@ApiTags('foods')
@Controller('foods/:foodId/photo')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('foodId') foodId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.photosService.create(+foodId, file);
    return result;
  }

  @Get()
  @Redirect('', 303)
  async findOne(@Param('foodId') foodId: string) {
    const result = await this.photosService.findOne(+foodId);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { url: result };
  }

  @Delete()
  async remove(@Param('foodId') foodId: string) {
    await this.photosService.remove(+foodId);
  }
}
