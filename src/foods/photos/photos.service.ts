import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';
import Photo from './photo.entity';
import { FoodsService } from 'src/foods/foods.service';

@Injectable()
export class PhotosService {
  s3: AWS.S3;

  constructor(
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
    private readonly foodsService: FoodsService,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
      region: process.env.AWS_REGION,
    });
  }

  async findOne(foodId: number) {
    const food = await this.foodsService.findOne(foodId);
    if (!food?.photoId) {
      return null;
    }

    const photo = await this.photosRepository.findOneBy({ id: food.photoId });
    if (!photo) {
      return null;
    }

    return this.s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: photo.key,
      Expires: 60,
    });
  }

  async remove(foodId: number) {
    const food = await this.foodsService.findOne(foodId);
    if (!food?.photoId) {
      return null;
    }

    await this.foodsService.update(foodId, { photoId: null });
    await this.photosRepository.delete(food.photoId);
  }

  async create(foodId: number, file: Express.Multer.File) {
    const s3File = await this.uploadFile(file);
    const photo = await this.photosRepository.save({
      key: s3File.Key,
      filename: file.originalname,
      byteSize: file.size,
      contentType: file.mimetype,
      checksum: s3File.ETag,
    });
    await this.foodsService.update(foodId, { photoId: photo.id });
    return photo;
  }

  private async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    return this.s3Upload(file.buffer, originalname, file.mimetype);
  }

  private async s3Upload(file: Buffer, name: string, mimetype: string) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: name,
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    return this.s3.upload(params).promise();
  }
}
