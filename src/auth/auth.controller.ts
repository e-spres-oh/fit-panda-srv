import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorators';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async create(@Body() user: Omit<User, 'id'>) {
    try {
      const { password, ...result } = await this.usersService.create(user);
      return result;
    } catch (error) {
      if (error.constraint === 'UQ_8d93d6e9c26205a1935956218ab') {
        throw new BadRequestException('Username already exists');
      }

      throw error;
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
