import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TravelDocument = Travel & Document;

class subNotes {
  @Prop()
  Note: string;
  @Prop()
  Date: Date;
}
@Schema()
class Travel extends Document {
  @Prop()
  Country: string;
  @Prop()
  Recommendation: string;
  @Prop()
  Level: number;
  @Prop()
  LevelDescr: string;
  @Prop()
  Date: Date;
  @Prop()
  Notes: [subNotes];
}

export const TravelSchema = SchemaFactory.createForClass(Travel).index({
  Country: 1,
});
