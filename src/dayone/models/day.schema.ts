import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DayOneDocument = DayOne & Document;

class subDay extends Document {
  @Prop()
  Country: string;
  @Prop()
  CountryCode: string;
  @Prop()
  Province: string;
  @Prop()
  City: string;
  @Prop()
  CityCode: string;
  @Prop()
  Lat: string;
  @Prop()
  Lon: string;
  @Prop()
  Cases: number;
  @Prop()
  Status: string;
  @Prop()
  Confirmed: number;
  @Prop()
  Deaths: number;
  @Prop()
  Recovered: number;
  @Prop()
  Active: number;
  @Prop()
  Date: Date;
  @Prop()
  average: number;
}
@Schema()
class DayOne extends Document {
  @Prop({ type: subDay })
  name: subDay;
  @Prop()
  createdAt: Date;
  @Prop()
  average: number;
}

export const DayOneSchema = SchemaFactory.createForClass(DayOne);
