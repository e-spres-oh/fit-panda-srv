import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators';
import User, { CreateUserDTO, UserDTO } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO, LoginResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async create(@Body() user: CreateUserDTO): Promise<UserDTO> {
    try {
      const { password, ...result } = await this.usersService.create(user);
      return result;
    } catch (error) {
      if (error.constraint === 'UQ_8d93d6e9c26205a1935956218ab') {
        throw new BadRequestException('Email already exists');
      }

      throw error;
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: LoginDTO,
    @Req() req: Request & { user: User },
  ): Promise<LoginResponseDTO> {
    return this.authService.login(req.user);
  }
}
