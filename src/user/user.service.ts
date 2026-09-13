import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema.js';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-request.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(request: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(request.password, 12);

    const user = await this.userModel.create({
      firstName: request.firstName,
      lastName: request.lastName,
      password: hashedPassword,
    });

    if (!user) {
      throw new ConflictException('No se ha podido crear el usuario');
    }

    return user;
  }

  async getByName(username: string): Promise<any> {
    const user = await this.userModel
      .findOne({
        firstName: username,
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
}
