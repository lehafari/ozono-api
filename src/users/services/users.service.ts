import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { hash } from 'argon2';
import { Tokens } from 'src/auth/types';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../models/user.model';
import { UsersRepository } from '../repositories/user.repository';
import argon2 from 'argon2';
import { UpdateUserDto } from '../dtos';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  //***** Create user ******//
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

  //***** Update user*****//
  async updateUser(id: string, user: UpdateUserDto): Promise<number> {
    const updateUser = await this.usersRepository.updateUser(id, user);
    if (!updateUser) {
      throw new ForbiddenException('El usuario no existe');
    }
    return updateUser;
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

  //***** Upload profile image *****//
  async uploadProfileImage(profileImage: any): Promise<number> {
    if (!profileImage) {
      throw new BadRequestException('Tiene que subir una imagen');
    }
    const response = await this.usersRepository.uploadProfileImage(
      profileImage,
    );
    return response;
  }

  //***** Find user by id *****//
  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new ForbiddenException('El usuario no existe');
    }
    return user;
  }
}
