import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { validateEmail } from 'src/validators/email.validators';

export type ContactDocument = Contact & Document;

@Schema()
class Contact extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email'],
    trim: true,
    lowercase: true,
  })
  email: string;
  @Prop({ required: true })
  message: string;
  @Prop()
  createdAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

/*UserSchema.pre('save', async function () {
  await this.populate('user', '+password')
});*/
