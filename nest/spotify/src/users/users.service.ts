import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    userDTO.password = bcrypt.hashSync(userDTO.password, salt);
    const user = await this.userRepository.save(userDTO);
// delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async setLoginStatus(email: string, status: boolean): Promise<void> {
    await this.userRepository.update({ email }, { isLogin: status });
  }
}
