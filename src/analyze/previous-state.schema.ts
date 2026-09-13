import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type AnalysisDocument = HydratedDocument<PreviousAnalysis>;
@Schema({ timestamps: true })
export class PreviousAnalysis {
  @Prop({ required: true }) accountNumber: string;
  @Prop({ type: Object, required: true }) previousState: Record<string, any>;
}
export const PreviousStateSchema =
  SchemaFactory.createForClass(PreviousAnalysis);
