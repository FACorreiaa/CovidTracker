import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WIPDocument = WIP & Document;

class subWIP extends Document {
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


}
@Schema()
class WIP extends Document {
  @Prop({ type: subWIP })
  name: subWIP
  @Prop()
  createdAt: Date;
}

export const WIPSchema = SchemaFactory.createForClass(WIP);


