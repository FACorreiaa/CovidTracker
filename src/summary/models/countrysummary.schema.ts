import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CountrySummaryDocument = CountrySummary & Document;

class subCountry {
  @Prop()
  Country: string;
  @Prop()
  CountryCode: string;
  @Prop()
  Slug: string;
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
  Date: Date;
}
@Schema()
class CountrySummary extends Document {
  @Prop()
  countrySummary: [subCountry]
  @Prop()
  createAt: Date;
}


export const CountrySummarySchema = SchemaFactory.createForClass(CountrySummary);