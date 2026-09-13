import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema.js';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-request.dto.js';
import * as bcrypt from 'bcrypt';
import { first, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Account, AccountDocument } from './user-account.schema.js';

@Injectable()
export class UserService {
  private readonly apiKey = process.env.NESSIE_API_KEY;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,

    private readonly httpService: HttpService,
  ) {}

  async create(request: CreateUserDto): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.NESSIE_BASE_URI}/customers`,
        {
          first_name: request.firstName,
          last_name: request.lastName,
        },
        {
          params: {
            key: this.apiKey,
          },
        },
      ),
    );

    const { data } = response;

    const hashedPassword = await bcrypt.hash(request.password, 12);

    const user = await this.userModel.create({
      username: request.username,
      firstName: request.firstName,
      lastName: request.lastName,
      password: hashedPassword,
      nessieId: data.objectCreated._id,
    });

    if (!user) {
      throw new ConflictException('No se ha podido crear el usuario');
    }

    const userAccount = await this.createCustomerAccount(
      data.objectCreated._id,
      'Checking',
      'Account savings',
      0,
      0,
    );

    return {
      customer: user,
      account: userAccount,
    };
  }

  async getByName(username: string): Promise<any> {
    const user = await this.userModel
      .findOne({
        username: username,
      })
      .exec();

    if (!user) {
      return null;
    }

    return user;
  }

  async getUsers(): Promise<any> {
    const users = await this.userModel.find().exec();

    return users;
  }

  async createCustomerAccount(
    customerId: string,
    type: string,
    nickname: string,
    rewards: number,
    balance: number,
  ): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.NESSIE_BASE_URI}/customers/${customerId}/accounts`,
        {
          type,
          nickname,
          rewards,
          balance,
        },
        {
          params: {
            key: this.apiKey,
          },
        },
      ),
    );

    const { data } = response;

    const account = await this.accountModel.create({
      nessieId: data.objectCreated._id,
      type,
      nickname,
      rewards,
      balance,
      accountNumber: data.objectCreated.account_number,
      customerId,
    });

    return account;
  }
}
