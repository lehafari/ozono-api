import { EntityRepository, Repository } from 'typeorm';
import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { User } from '../models/user.model';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  //***** Find By User or Email*****//
  async findByUserOrEmail(userOrEmail: string): Promise<User> {
    return await this.findOne({
      where: [{ username: userOrEmail }, { email: userOrEmail }],
    });
  }
}
