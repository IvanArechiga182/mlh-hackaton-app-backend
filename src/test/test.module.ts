import { Module } from '@nestjs/common';
import { TestService } from './test.service.js';
import { TestController } from './test.controller.js';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './test.schema.js';

@Module({
  controllers: [TestController],
  exports: [TestService],
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Test.name,
        schema: TestSchema,
      },
    ]),
  ],
  providers: [TestService],
})
export class TestModule {}
