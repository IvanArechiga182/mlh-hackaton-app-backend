import { Module } from '@nestjs/common';
import { OperationService } from './operation.service.js';
import { OperationController } from './operation.controller.js';
import { UserModule } from '../user/user.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './operation.schema.js';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
