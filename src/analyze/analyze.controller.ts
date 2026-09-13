import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AnalyzeService } from './analyze.service.js';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnalyzeDto } from './dto/analyze.dto.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { IBaseResponse } from '../common/dto/IBaseResponse.interface.js';
import { JwtAuthGuard } from '../auth/guards/auth.guard.js';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Analyze')
@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Get()
  @ApiOkResponse({
    description: 'Transacciones analizadas de manera exitosa.',
  })
  async analyze(
    @CurrentUser() user: any,
    @Query() request: AnalyzeDto,
  ): Promise<IBaseResponse> {
    const { accountNumber } = user;

    const analysis = await this.analyzeService.sendToAnalyze(
      accountNumber,
      request,
    );

    return {
      message: 'Analisis realizado exitosamente.',
      status: 200,
      resource: analysis,
    };
  }
}
