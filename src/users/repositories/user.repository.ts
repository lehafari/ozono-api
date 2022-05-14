import { EntityRepository, getRepository, Like, Repository } from 'typeorm';
import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { User } from '../models/user.model';
import { UpdateUserDto } from '../dtos';
import argon2 from 'argon2';
import { Course } from 'src/e-learning/courses/models/course.model';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  //***** Find By User or Email*****//
  async findByUserOrEmail(userOrEmail: string): Promise<User> {
    return await this.findOne({
      where: [{ username: userOrEmail }, { email: userOrEmail }],
    });
  }

  //***** Update User*****//
  async updateUser(id: string, user: UpdateUserDto): Promise<number> {
    try {
      await this.createQueryBuilder()
        .update(User)
        .set(user)
        .where('id = :id', { id })
        .execute();
      return HttpStatus.OK;
    } catch (error) {
      if (error.code === '23505' && error.detail.includes('username')) {
        throw new ForbiddenException('El usuario ya existe');
      }
      if (error.code === '23505' && error.detail.includes('email')) {
        throw new ForbiddenException('El email ya existe');
      }
    }
  }

  //***** Upload Profile image *****//
  async uploadProfileImage(profileImage: any): Promise<number> {
    const response = await this.createQueryBuilder()
      .update(User)
      .set({ image: profileImage.filename })
      .where('id = :id', { id: profileImage.user })
      .execute();
    if (!response) {
      throw new ForbiddenException('El usuario no existe');
    }
    if (response) {
      return HttpStatus.OK;
    } else {
      throw new ForbiddenException('No se pudo actualizar la imagen');
    }
  }

  //***** Delete User *****//
  async deleteUser(id: string, confirmPassword: string) {
    const user = await this.findOne({ id });
    if (!user) {
      return false;
    }
    const verify = await argon2.verify(user.password, confirmPassword);
    if (!verify) {
      throw new ForbiddenException('La contraseña no es correcta');
    }
    const deleteUser = await this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
    if (!deleteUser) {
      throw new ForbiddenException('El usuario no existe');
    }
    return HttpStatus.OK;
  }

  //***** Verify Password *****//
  verifyPassword(password: string, hash: string) {
    return argon2.verify(hash, password);
  }

  //! ***** Funciones exclusivas de administrados ******//

  //***** Delete user by admin *****//
  async deleteUserByAdmin(id: string) {
    const deleteUser = await this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
    if (!deleteUser) {
      throw new ForbiddenException('El usuario no existe');
    }
    return HttpStatus.OK;
  }

  //***** Find users *****//
  async findUsers(value: string): Promise<User[]> {
    const users = await this.createQueryBuilder()
      .where({
        username: Like(`%${value}%`),
      })
      .orWhere({
        email: Like(`%${value}%`),
      })
      .orWhere({
        firstName: Like(`%${value}%`),
      })
      .orWhere({
        lastName: Like(`%${value}%`),
      })
      .orderBy('username', 'DESC')
      .getMany();

    if (users.length === 0) {
      throw new ForbiddenException('No hay usuarios');
    }
    users.map((user) => {
      delete user.password;
      delete user.refreshToken;
    });
    return users;
  }
}
