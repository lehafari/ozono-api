import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/types';
import { GetUser } from '../decorators';
import { Roles } from '../enum/roles.enum';

@Controller('users')
export class UsersController {
  //! Disponible para todos los roles !//

  //***** Get actual user *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get actual user' })
  @Get('me')
  getActualUser(@GetUser() user: JwtPayload) {
    return user;
  }
}
