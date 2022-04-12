import { EntityRepository, Repository } from 'typeorm';
import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { User } from '../models/user.model';
import { UpdateUserDto } from '../dtos';

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
    const updateUser = await this.createQueryBuilder()
      .update(User)
      .set(user)
      .where('id = :id', { id })
      .execute();
    if (!updateUser) {
      throw new ForbiddenException('El usuario no existe');
    }
    return HttpStatus.OK;
  }

  //***** Upload Profile image *****//
  async uploadProfileImage(profileImage: any): Promise<number> {
    const response = await this.createQueryBuilder()
      .update(User)
      .set({ image: profileImage.filename })
      .where('id = :id', { id: profileImage.user })
      .execute();

    if (!response.affected) {
      throw new ForbiddenException('El usuario no existe');
    }
    if (response) {
      return HttpStatus.OK;
    } else {
      throw new ForbiddenException('No se pudo actualizar la imagen');
    }
  }
}
