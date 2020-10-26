import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WIPTotalDocument = TotalWIP & Document;

@Schema()
class TotalWIP extends Document {
  @Prop()
  TotalConfirmed: number;
  @Prop()
  TotalDeaths: number;
  @Prop()
  TotalRecovered: number;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const TotalWIPSchema = SchemaFactory.createForClass(TotalWIP);


