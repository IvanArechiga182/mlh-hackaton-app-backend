import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  nessieId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  rewards: number;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  customerId: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
