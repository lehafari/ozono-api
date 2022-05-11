import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { RoleGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../enum/roles.enum';
import { User } from '../models/user.model';
import { GetUser } from '../decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/upload';
import { Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/types';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos';
import { confirmPasswordDto } from '../dtos/confirmPassword.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //! Disponible para todos los roles !//

  //***** Get actual user *****//

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get actual user' })
  @Get('me')
  async getActualUser(@GetUser() user: JwtPayload) {
    const actualUser = await this.usersService.findById(user.sub);
    delete actualUser.password;
    delete actualUser.refreshToken;
    return actualUser;
  }

  //***** Update user*****//

  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @Put('update')
  async updateUser(
    @GetUser() user: JwtPayload,
    @Body() updateUser: UpdateUserDto,
  ) {
    try {
      return await this.usersService.updateUser(user.sub, updateUser);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ha ocurrido un error actualizando el usuario',
      );
    }
  }

  //***** Upload Profile image*****//

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload profile image' })
  @Put('profileImage/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file: any,
    @GetUser() user,
  ): Promise<number> {
    try {
      file.user = user.sub;
      const profileImage = file;
      return this.usersService.uploadProfileImage(profileImage);
    } catch (error) {
      throw new BadRequestException('Ha ocurrido un error subiendo la imagen');
    }
  }

  //***** Get Profile Image*****//

  // @UseGuards(JwtGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile image' })
  @Get('profileImage/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res): any {
    return this.usersService.getProfileImage(image, res);
  }

  //***** Delete user *****//

  @UseGuards(JwtGuard)
  @ApiBody({ type: confirmPasswordDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @Delete('delete')
  async deleteUser(
    @GetUser() user: JwtPayload,
    @Body() confirmPassword: confirmPasswordDto,
  ) {
    try {
      return await this.usersService.deleteUser(
        user.sub,
        confirmPassword.password,
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ha ocurrido un error eliminando el usuario',
      );
    }
  }

  //! Disponible solo para el rol ADMIN !//

  //***** Get all users *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  //***** Update users *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update users' })
  @Put('updateUser/:id')
  async updateUsers(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<number> {
    try {
      return await this.usersService.updateUser(id, updateUser);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ha ocurrido un error actualizando el usuario',
      );
    }
  }

  //***** Delete users *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete users' })
  @Delete('deleteUser/:id')
  async deleteUsers(@Param('id') id: string): Promise<number> {
    try {
      return await this.usersService.deleteUserByAdmin(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ha ocurrido un error eliminando el usuario',
      );
    }
  }
  //***** Find users *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find users' })
  @Get('find/:id')
  async findUsers(@Param('id') id: string): Promise<User[]> {
    return this.usersService.findUsers(id);
  }
}
