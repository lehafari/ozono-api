import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { GetUser } from 'src/users/decorators';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateScoreDto, CreateScoreWithUserIdDto } from '../dtos';
import { ScoreService } from '../services/score.service';

@ApiTags('score')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  //*****  Create score for a quiz and a user in a course ******//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a score for a quiz and a user in a course',
  })
  @Put('set')
  async createScore(
    @GetUser('sub') userId: string,
    @Body() createScoreDto: CreateScoreDto,
  ) {
    try {
      return this.scoreService.createScore(userId, createScoreDto);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  //*****  Create score for a quiz and a user in a course by ADMIN ******//
  //! only for ADMIN
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a score for a quiz and a user in a course by ADMIN',
  })
  @Put('set/admin')
  async createScoreByAdmin(
    @Body() createScoreWithUserIdDto: CreateScoreWithUserIdDto,
  ) {
    try {
      return this.scoreService.createScoreWithUser(createScoreWithUserIdDto);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
