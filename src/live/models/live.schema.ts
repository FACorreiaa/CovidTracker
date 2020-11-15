import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LiveDocument = Live & Document;

class subLive extends Document {
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
class Live extends Document {
  @Prop({ type: subLive })
  name: subLive;
  @Prop()
  createdAt: Date;
}

export const LiveSchema = SchemaFactory.createForClass(Live);
LiveSchema.index({ 'name.Country': 1 }, { unique: true });
