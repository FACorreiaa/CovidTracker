import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProgressPlugin } from 'webpack';

export type StatisticsDocument = Statistics & Document;

@Schema()
class Statistics extends Document {
  @Prop()
  avgConfirmed: number;
  @Prop()
  stdConfirmed: number;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
