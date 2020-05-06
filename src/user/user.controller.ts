import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserRegistered } from './interfaces/user-registered.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDTO): any {
    return this.usersService.login(loginUserDto);
  }
  @Post('register')
  register(@Body() createUserDto: CreateUserDTO): Promise<UserRegistered> {
    return this.usersService.register(createUserDto);
  }
}
