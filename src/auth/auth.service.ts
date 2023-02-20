import { Injectable } from '@nestjs/common';
import User from 'src/users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username, pass);
    if (!user) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }
}