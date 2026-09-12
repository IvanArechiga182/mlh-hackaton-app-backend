import { Controller } from '@nestjs/common';
import { OperationService } from './operation.service.js';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}
}
