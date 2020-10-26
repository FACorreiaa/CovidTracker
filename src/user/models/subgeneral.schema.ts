import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { validateEmail } from 'src/validators/email.validators';

export type SubscribeGeneralDocument = SubscribeGeneral & Document;



@Schema()
class SubscribeGeneral extends Document {
  @Prop({
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email'],
    trim: true,
    lowercase: true,
    unique: true
  })
  email: string;
  @Prop()
  createdAt: Date;
}

export const SubscribeGeneralSchema = SchemaFactory.createForClass(SubscribeGeneral);


