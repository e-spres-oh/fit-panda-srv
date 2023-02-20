import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }
}
