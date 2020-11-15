import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

class subCountry extends Document {
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
}
@Schema()
class Country extends Document {
  @Prop({ type: subCountry })
  name: subCountry;
  @Prop()
  createdAt: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
CountrySchema.index({ 'name.Country': 1, 'name.Status': 1 }, { unique: true });
