import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SlugsDocument = Slugs & Document;

class slugList extends Document {
  @Prop()
  Country: string;
  @Prop()
  Slug: string;
  @Prop()
  ISO2: string;


}
@Schema()
class Slugs extends Document {
  @Prop({ type: slugList })
  list: slugList
  @Prop()
  createdAt: Date;
}

export const SlugSchema = SchemaFactory.createForClass(Slugs);


