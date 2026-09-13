import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema.js';
import { HttpModule } from '@nestjs/axios';
import { Account, AccountSchema } from './user-account.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
