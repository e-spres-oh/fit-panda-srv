import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Profile, { CreateProfileDTO } from './profile.entity';
import { ProfilesService } from './profiles.service';

@ApiTags('profile')
@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() profile: CreateProfileDTO): Promise<Profile> {
    const result = await this.profilesService.findOne();
    if (result) {
      return (await this.profilesService.update(profile)) || result;
    } else {
      return this.profilesService.create(profile);
    }
  }

  @Get()
  async findOne(): Promise<Profile> {
    const result = await this.profilesService.findOne();
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
