import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/users/decorators';
import { CertificateService } from '../services/certificate.service';

@ApiTags('Certificates')
@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get certificate' })
  @Get(':courseId')
  async getCertificate(
    @GetUser('sub') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return await this.certificateService.getCertificate(userId, courseId);
  }
}
