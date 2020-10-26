import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { LiveController } from './controllers/live/live.controller';
import { LiveSchema } from './models/live.schema';
import { LiveService } from './services/live/live.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: 'Live', useFactory: () => {
      const schema = LiveSchema;
      schema.pre('save', function () {
        this.update({}, { $set: { updatedAt: new Date() } });
      });
      return schema;
    },
  }]), forwardRef(() => EmailModule), CacheModule.register()],
  controllers: [LiveController],
  providers: [LiveService],
  exports: [LiveService]
})
export class LiveModule { }
