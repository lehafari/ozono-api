import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
      const tokens = await this.getTokens(user);
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
      throw new ForbiddenException('El usuario no existe');
    }
    const isValid = await argon2.verify(user.password, signinDto.password);
    if (!isValid) {
      throw new ForbiddenException('El password no es valido');
    }
    const tokens = await this.getTokens(user);
    await this.updateHashRefreshToken(tokens.refresh_token, user.id);
    return tokens;
  }

  logout(): string {
    return 'logout';
  }

  //***** HELPERS******//

  //***** Metodo para Generar Tokens *****//
  async getTokens(user): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.jwt.secret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.jwt.refreshSecret,
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  //***** Metodo para guardar refresh token en la base de datos *****//
  async updateHashRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<void> {
    const hash = await argon2.hash(refreshToken);
    await this.usersService.updateHashRefreshToken(userId, hash);
  }
}
