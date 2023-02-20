import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      username,
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async create(user: Omit<User, 'id'>) {
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    return this.usersRepository.save({ ...user, password: hash });
  }
}
