import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { subCountry } from 'src/summary/models/subCountry.interface';
import { validateEmail } from 'src/validators/email.validators';

export type SubscribeCountryDocument = SubscribeCountry & Document;

@Schema()
class SubscribeCountry extends Document {
  @Prop({
    required: true,
    validate: [validateEmail, 'Please fill a valid email'],
    trim: true,
    lowercase: true,
    unique: true,
  })
  email: string;
  @Prop()
  countries: string[];
  @Prop()
  createdAt: Date;
  @Prop()
  countryDetails: subCountry[];
}

export const SubscribeCountrySchema = SchemaFactory.createForClass(
  SubscribeCountry,
);
