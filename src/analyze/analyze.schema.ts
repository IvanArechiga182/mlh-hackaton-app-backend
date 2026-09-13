import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Analysis {
  @Prop({ required: true })
  accountNumber: string;

  @Prop({ type: Object, required: true })
  previousState: Record<string, any>;

  @Prop({ type: Object })
  currentState: Record<string, any>;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
