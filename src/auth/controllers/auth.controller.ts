import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { SigninDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { Tokens } from '../types';

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
}
