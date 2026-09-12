import { Module } from '@nestjs/common';
import { OperationService } from './operation.service.js';
import { OperationController } from './operation.controller.js';

@Module({
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
