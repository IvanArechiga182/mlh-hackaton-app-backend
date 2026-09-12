import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service.js';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiOkResponse({
    description: 'Exito',
  })
  async create() {
    return await this.testService.create();
  }

  @Get('all')
  @ApiOkResponse({
    description: 'exito',
  })
  async get() {
    return await this.testService.get();
  }
}
