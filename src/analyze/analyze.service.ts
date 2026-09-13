import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Analysis } from './analyze.schema.js';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { AnalyzeDto } from './dto/analyze.dto.js';
import { OperationService } from '../operation/operation.service.js';
import { firstValueFrom } from 'rxjs';
import { BaseConfigs } from '../common/user-test-configs.js';
import { PreviousAnalysis } from './previous-state.schema.js';

@Injectable()
export class AnalyzeService {
  constructor(
    @InjectModel(Analysis.name)
    private readonly analysisModel: Model<Analysis>,

    @InjectModel(PreviousAnalysis.name)
    private readonly previousAnalysisModel: Model<PreviousAnalysis>,

    private readonly httpService: HttpService,

    private readonly operationService: OperationService,
  ) {}

  async sendToAnalyze(accountNumber: string, request: AnalyzeDto) {
    const { startDate, endDate } = request;

    const startDateFormat = new Date(`${startDate}T00:00:00.000Z`);
    const endDateFormat = new Date(`${endDate}T00:00:00.000Z`);

    const transactions = await this.operationService.findByDates(
      startDateFormat,
      endDateFormat,
      accountNumber,
    );

    const transactionsPayload = transactions.map((transaction: any) => ({
      id: transaction._id.toString(),
      merchant: transaction.merchant ?? 'MOVIMIENTO_USUARIO',
      amount: transaction.amount,
      currency: 'MXN',
      timestamp: transaction.createdAt,
      account_id: transaction.accountNumber,
    }));

    if (transactions.length === 0) {
      throw new BadRequestException('No existen transacciones para analizar');
    }

    const previousAnalysis = await this.previousAnalysisModel
      .findOne({
        accountNumber,
      })
      .sort({ createdAt: -1 })
      .select('previousState');

    const previousState = previousAnalysis?.previousState;

    const config = BaseConfigs[1];

    const response = await firstValueFrom(
      this.httpService.post(`${process.env.AI_SERVICE_BASE_URI}/v1/analyze`, {
        user: config.user,
        config: config.config,
        previus_state: previousState,
        transactions: transactionsPayload,
      }),
    );

    const { data } = response;

    if (!data) {
      throw new BadRequestException(
        'No se pudo realizar el analisis correctamente por el servicio de IA.',
      );
    }

    const newPreviousState = data;

    await this.previousAnalysisModel.create({
      accountNumber,
      previousState: newPreviousState,
    });

    return data;
  }
}
