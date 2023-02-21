import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/jwt.strategy';
import { Repository } from 'typeorm';
import Profile, { CreateProfileDTO, UpdateProfileDTO } from './profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @Inject(REQUEST)
    private request: Request & { user: CurrentUser },
  ) {}

  async findOne() {
    return this.profilesRepository.findOneBy({
      userId: this.request.user.id,
    });
  }

  async create(profile: CreateProfileDTO) {
    return this.profilesRepository.save({
      ...profile,
      userId: this.request.user.id,
    });
  }

  async update(profile: UpdateProfileDTO) {
    await this.profilesRepository.update(
      { userId: this.request.user.id },
      profile,
    );
    return this.profilesRepository.findOneBy({
      userId: this.request.user.id,
    });
  }
}
