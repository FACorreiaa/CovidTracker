import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { UserSchema } from './models/users.schema';
import { SubscribeGeneralSchema } from './models/subgeneral.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { SubscribeCountrySchema } from './models/subcountry.schema';
import { SummaryModule } from 'src/summary/summary.module';
import { ContactSchema } from './models/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
      {
        name: 'Contact',
        useFactory: () => {
          const schema = ContactSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
      {
        name: 'SubscribeGeneral',
        useFactory: () => {
          const schema = SubscribeGeneralSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
      {
        name: 'SubscribeCountry',
        useFactory: () => {
          const schema = SubscribeCountrySchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
    ]),
    AuthModule,
    CacheModule.register(),
    forwardRef(() => EmailModule),
    forwardRef(() => SummaryModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
