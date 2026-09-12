import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { firstValueFrom } from 'rxjs';
import { Test, TestDocument } from './test.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class TestService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Test.name)
    private readonly testModel: Model<TestDocument>,
  ) {}

  async create(): Promise<any> {
    const apiKey = process.env.NESSIE_API_KEY;

    const response = await firstValueFrom(
      this.httpService.get(`${process.env.NESSIE_BASE_URI}/customers`, {
        params: {
          key: apiKey,
        },
      }),
    );

    const { data } = response;

    for (const user of data) {
      const dataUser = {
        name: user.first_name,
        createdId: user._id,
      };

      await this.testModel.create(dataUser);
    }
  }

  async get(): Promise<any> {
    return await this.testModel.find();
  }
}
