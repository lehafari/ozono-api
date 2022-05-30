import fs from 'fs';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
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
      throw new BadRequestException(error.message);
    }
  }

  //***** Update user*****//
  async updateUser(id: string, user: UpdateUserDto): Promise<number> {
    try {
      const updateUser = await this.usersRepository.updateUser(id, user);
      return updateUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El usuario o el email ya existen');
      }
      throw new BadRequestException(error.message);
    }
  }

  //***** Update Hash Refresh Token *****//
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
    const user = await this.usersRepository.findOne(profileImage.user);
    console.log('user: =>', user);
    if (user.image) {
      // delete old image from server
      try {
        fs.unlinkSync(`./files/${user.image}`);
      } catch (error) {
        console.log(error);
      }
    }
    const response = await this.usersRepository.uploadProfileImage(
      profileImage,
    );
    return response;
  }

  //***** Get Profile Image *****//
  getProfileImage(image: string, res): any {
    if (!fs.existsSync(`./files/${image}`)) {
      throw new NotFoundException('No existe la imagen');
    }
    const img = res.sendFile(image, { root: './files' });
    return img;
  }

  //***** Find user by id *****//
  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new ForbiddenException('El usuario no existe');
    }
    return user;
  }

  //***** Find  user by id or email ******//
  async findByUserOrEmail(userOrEmail: string): Promise<User> {
    const user = await this.usersRepository.findByUserOrEmail(userOrEmail);
    if (!user) {
      throw new ForbiddenException('El usuario no existe');
    }
    return user;
  }

  //***** Delete User *****//
  async deleteUser(id: string, confirmPassword: string): Promise<number> {
    const deleteUser = await this.usersRepository.deleteUser(
      id,
      confirmPassword,
    );
    if (!deleteUser) {
      throw new ForbiddenException('El usuario no existe');
    }
    return deleteUser;
  }

  //! ***** Funciones exclusivas de administrados ******//

  //***** Get all users *****//
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new ForbiddenException('No hay usuarios');
    }
    users.map((user) => {
      delete user.password;
      delete user.refreshToken;
    });
    return users;
  }
  //***** Get users by rol *****//
  async getUsersByRol(role: string): Promise<User[]> {
    const users = await this.usersRepository.getUsersByRol(role);
    if (!users) {
      throw new ForbiddenException('No hay usuarios');
    }
    users.map((user) => {
      delete user.password;
      delete user.refreshToken;
    });
    return users;
  }

  //***** Delete user *****//
  async deleteUserByAdmin(id: string) {
    const deleteUser = await this.usersRepository.deleteUserByAdmin(id);
    if (!deleteUser) {
      throw new ForbiddenException('El usuario no existe');
    }
    return deleteUser;
  }

  //***** Find users *****//
  async findUsers(value: string): Promise<User[]> {
    const users = await this.usersRepository.findUsers(value);
    if (!users) {
      throw new ForbiddenException('No hay usuarios');
    }
    users.map((user) => {
      delete user.password;
      delete user.refreshToken;
    });
    return users;
  }
}
