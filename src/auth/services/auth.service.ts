import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import config from 'src/config/config';
import { CreateUserDto } from 'src/users/dtos';
import { UsersService } from 'src/users/services/users.service';
import { SigninDto } from '../dtos';
import { JwtPayload, Tokens } from '../types';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
  ) {}

  //***** Metodo para Crear Usuario *****//
  async signup(createUserDto: CreateUserDto): Promise<Tokens> {
    try {
      const user = await this.usersService.createUser(createUserDto);
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateHashRefreshToken(tokens.refresh_token, user.id);
      return tokens;
    } catch (error) {
      throw error;
    }
  }
  //***** Metodo para Logear un Usuario ******//
  async signin(signinDto: SigninDto): Promise<Tokens> {
    const user = await this.usersService.findByUserOrEmail(
      signinDto.userOrEmail,
    );
    if (!user) {
      throw new Error('El usuario no existe');
    }
    console.log(user);

    //compare hash password with argon2
    const isValid = argon2.verify(user.password, signinDto.password);
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateHashRefreshToken(tokens.refresh_token, user.id);
    return tokens;
  }

  logout(): string {
    return 'logout';
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.jwt.secret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.jwt.secret,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateHashRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<void> {
    const hash = hashSync(refreshToken, 10);
    await this.usersService.updateHashRefreshToken(userId, hash);
  }
}
