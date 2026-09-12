import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  nessieId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  medium: string;

  @Prop({ required: true })
  transactionDate: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  accountId: string;

  @Prop()
  description: string;

  @Prop()
  merchantId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
