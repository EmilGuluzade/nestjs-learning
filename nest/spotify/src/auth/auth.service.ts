import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth-dto';
import { UpdateAuthDto } from './dto/update-auth-dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { BaseResponse } from '../base/base.response';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDTO): Promise<BaseResponse<any>> {
    const existing = await this.usersService.findByEmail(createUserDto.email);
    if (existing) {
      throw new ConflictException('A user with this email already exists.');
    }
    const user = await this.usersService.create(createUserDto);
    const { password, ...userWithoutPassword } = user;
    return new BaseResponse(true, 'Registration successful', userWithoutPassword);
  }

  async login(createAuthDto: CreateAuthDto): Promise<BaseResponse<any>> {
    const user = await this.usersService.findByEmail(createAuthDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user.isLogin) {
      throw new UnauthorizedException('User is already logged in!');
    }
    const isPasswordValid = await bcrypt.compare(createAuthDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    await this.usersService.setLoginStatus(user.email, true);
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    const token = jwt.sign(payload, 'gizliAnahtar', { expiresIn: '1h' });
    const { password, ...userWithoutPassword } = { ...user, isLogin: true };
    return new BaseResponse(true, 'Login successful', { ...userWithoutPassword, token });
  }
  

  async logout(email: string): Promise<BaseResponse<any>> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this.usersService.setLoginStatus(email, false);
    return new BaseResponse(true, 'Logout successful');
  }
}
