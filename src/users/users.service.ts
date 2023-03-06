import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User, { CreateUserDTO } from './user.entity';

import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async create(user: CreateUserDTO) {
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    return this.usersRepository.save({ ...user, password: hash });
  }
}
