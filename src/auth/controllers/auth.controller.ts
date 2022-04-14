import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/users/decorators';
import { GetCurrentUser } from 'src/users/decorators/getCurrentUser.decorator';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { User } from 'src/users/models/user.model';
import { SigninDto } from '../dtos';
import { JwtGuard, RtGuard } from '../guards';
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
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Logout' })
  @Put('logout')
  logout(@GetUser('sub') id: string): Promise<number> {
    return this.authService.logout(id);
  }

  //***** Refrescar el token *****//
  @UseGuards(RtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh the token' })
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser() user: JwtPayload,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(user.sub, refreshToken);
  }
}
