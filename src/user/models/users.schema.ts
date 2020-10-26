import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { validateEmail } from 'src/validators/email.validators';

export type UserDocument = User & Document;

@Schema()
class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email'],
    trim: true,
    lowercase: true,
    unique: true
  })
  email: string;

  @Prop({ required: true, minlength: 3, maxlength: 16 })
  password: string;
  @Prop()
  role: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*UserSchema.pre('save', async function () {
  await this.populate('user', '+password')
});*/

export enum UserRole {
  ADMIN = 'admin',
  PREMIUM = 'premium',
  EDITOR = 'editor',
  USER = 'user',
}



