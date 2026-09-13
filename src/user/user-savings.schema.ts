import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SavingsDocument = HydratedDocument<Savings>;

@Schema({ timestamps: true })
export class Savings {
  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true, default: 'Cajita de ahorro' })
  name: string;

  @Prop()
  goal?: number;

  @Prop()
  targetDate?: Date;

  @Prop({ default: true })
  active: boolean;
}

export const SavingsSchema = SchemaFactory.createForClass(Savings);
