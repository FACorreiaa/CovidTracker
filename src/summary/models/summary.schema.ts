import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummaryDocument = Summary & Document;

@Schema()
class Summary extends Document {
  @Prop()
  Message: string;
  @Prop()
  NewConfirmed: number;
  @Prop()
  TotalConfirmed: number;
  @Prop()
  NewDeaths: number;
  @Prop()
  TotalDeaths: number;
  @Prop()
  NewRecovered: number;
  @Prop()
  TotalRecovered: number;
  @Prop()
  createdAt: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);


