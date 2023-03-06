import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/user.entity';
import { UsersService } from '../users/users.service';

export interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(email, pass);
    if (!user) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
