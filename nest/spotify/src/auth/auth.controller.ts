import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth-dto';
import { UpdateAuthDto } from './dto/update-auth-dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { BaseResponse } from '../base/base.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  

  @Post('register')
  async register(@Body() userDTO: CreateUserDTO): Promise<BaseResponse<any>> {
    return this.authService.register(userDTO);
  }

  @Post('login')
  async login(@Body() loginDto: CreateAuthDto): Promise<BaseResponse<any>> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Body('email') email: string) {
    return this.authService.logout(email);
  }

 
}
