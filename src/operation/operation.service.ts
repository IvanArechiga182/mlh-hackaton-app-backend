import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './operation.schema.js';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-operation.dto.js';
import { UserService } from '../user/user.service.js';
import { TransactionType } from './enum/transaction-type.enum.js';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,

    private readonly userService: UserService,
  ) {}

  async create(userData: any, request: CreateTransactionDto) {
    const { accountNumber, sub } = userData;

    const actualBalance =
      await this.userService.findAccountBalance(accountNumber);

    const isDeposit = request.type === TransactionType.DEPOSIT;

    const isIncomingTransfer =
      request.type === TransactionType.TRANSFER && request.amount > 0;

    if (!isDeposit && !isIncomingTransfer) {
      if (Math.abs(request.amount) > actualBalance) {
        throw new BadRequestException(
          `Saldo insuficiente para esta transaccion de tipo ${request.type}`,
        );
      }
    }

    const transaction = await this.transactionModel.create({
      type: request.type,
      medium: request.medium,
      status: request.status,
      amount: request.amount,
      customerId: sub,
      accountNumber: userData.accountNumber,
      description: request.description,
      merchant: request.merchant,
    });

    if (!transaction) {
      throw new BadRequestException('No se pudo procesar la transaccion.');
    }

    if (request.status === 'COMPLETED') {
      await this.userService.updateAccountBalance(
        accountNumber,
        actualBalance,
        request.amount,
      );
    }

    return {
      transaction,
    };
  }

  async findByDates(
    startDate: Date,
    endDate: Date,
    accountNumber: string,
  ): Promise<any> {
    const transactions = await this.transactionModel.find({
      accountNumber,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return transactions;
  }
}
