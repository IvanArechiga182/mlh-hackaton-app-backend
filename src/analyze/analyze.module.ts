import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service.js';
import { AnalyzeController } from './analyze.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Analysis, AnalysisSchema } from './analyze.schema.js';
import { HttpModule } from '@nestjs/axios';
import { OperationModule } from '../operation/operation.module.js';
import {
  PreviousAnalysis,
  PreviousStateSchema,
} from './previous-state.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Analysis.name,
        schema: AnalysisSchema,
      },
      {
        name: PreviousAnalysis.name,
        schema: PreviousStateSchema,
      },
    ]),
    HttpModule,
    OperationModule,
  ],
  controllers: [AnalyzeController],
  providers: [AnalyzeService],
})
export class AnalyzeModule {}
