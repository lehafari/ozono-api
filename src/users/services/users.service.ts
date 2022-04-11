import { ForbiddenException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Tokens } from 'src/auth/types';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../models/user.model';
import { UsersRepository } from '../repositories/user.repository';
import argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(crateUserDto: CreateUserDto): Promise<User> {
    try {
      const hashed = await argon2.hash(crateUserDto.password);
      const userEntity = await this.usersRepository.create({
        ...crateUserDto,
        password: hashed,
      });
      const user = await this.usersRepository.save(userEntity);
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El usuario o el email ya existen');
      }
      throw error();
    }
  }

  async findByUserOrEmail(userOrEmail: string): Promise<User> {
    const user = await this.usersRepository.findByUserOrEmail(userOrEmail);
    if (!user) {
      throw new ForbiddenException('El usuario no existe');
    }
    return user;
  }
  async updateHashRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.refreshToken = refreshToken;
    await this.usersRepository.save(user);
  }
}
