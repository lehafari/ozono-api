import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/users/decorators';
import { GetCurrentUser } from 'src/users/decorators/getCurrentUser.decorator';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { User } from 'src/users/models/user.model';
import { SigninDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { JwtPayload, Tokens } from '../types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //***** Crear un usuario *****//
  @ApiOperation({ summary: 'Create a new user' })
  @Put('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(createUserDto);
  }

  //***** Logear un usuario *****//
  @ApiOperation({ summary: 'User Login' })
  @Post('signin')
  signin(@Body() signinDto: SigninDto): Promise<Tokens> {
    return this.authService.signin(signinDto);
  }

  //***** Logout un usuario *****//
  @Post('logout')
  logout(): string {
    return this.authService.logout();
  }

  //***** Refrescar el token *****//
  // @UseGuards(RtGuard)
  @ApiOperation({ summary: 'Refresh the token' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser() user: JwtPayload,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    console.log(refreshToken);
    return this.authService.refreshTokens(user.sub, refreshToken);
  }
}
