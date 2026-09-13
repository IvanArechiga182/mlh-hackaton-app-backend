import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum/transaction-type.enum.js';
import { IsEnum } from 'class-validator';
export class CreateTransactionDto {
  @ApiProperty({
    example: 'purchase',
    description: 'Tipo de operación: deposit, withdrawal, transfer o purchase',
    enum: TransactionType,
    enumName: 'TransactionType',
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    example: 'balance',
    description: 'Medio utilizado para realizar la operación',
  })
  medium: string;

  @ApiProperty({
    example: '2026-09-13',
    description: 'Fecha de la operación',
  })
  transactionDate: string;

  @ApiProperty({
    example: 'completed',
    description: 'Estado de la operación',
  })
  status: string;

  @ApiProperty({
    example: 450.5,
    description: 'Monto de la operación',
  })
  amount: number;

  @ApiProperty({
    example: 'Compra en supermercado',
    description: 'Descripción de la operación',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'UBER EATS',
    description: 'Nombre del negocio en caso de compra.',
    required: false,
  })
  merchant?: string;
}
