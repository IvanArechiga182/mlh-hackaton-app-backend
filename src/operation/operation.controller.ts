import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OperationService } from './operation.service.js';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { CreateTransactionDto } from './dto/create-operation.dto.js';
import { IBaseResponse } from '../common/dto/IBaseResponse.interface.js';
import { JwtAuthGuard } from '../auth/guards/auth.guard.js';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Transaccion realizada exitosamente',
  })
  @ApiBadRequestResponse({
    description: 'Ocurrio un error de validacion',
  })
  async create(
    @CurrentUser() user: any,
    @Body() request: CreateTransactionDto,
  ): Promise<IBaseResponse> {
    const transaction = await this.operationService.create(user, request);

    return {
      message: 'Transaccion procesada correctamente',
      status: 200,
      resource: transaction,
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Transacciones obtenidas correctamente',
  })
  async find(@CurrentUser() userData: any): Promise<IBaseResponse> {
    const { accountNumber } = userData;

    const transactions = await this.operationService.findAll(accountNumber);

    return {
      message: 'Transacciones obtenidas correctamente',
      status: 200,
      resource: transactions,
    };
  }
}
