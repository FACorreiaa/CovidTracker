import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { SlugsController } from './controllers/slugs/slugs.controller';
import { SlugSchema } from './models/slugs.schema';
import { SlugsService } from './services/slugs/slugs.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: 'Slugs', useFactory: () => {
      const schema = SlugSchema;
      schema.pre('save', function () {
        this.update({}, { $set: { updatedAt: new Date() } });
      });
      return schema;
    },
  }]), forwardRef(() => EmailModule), CacheModule.register()],
  controllers: [SlugsController],
  providers: [SlugsService],
  exports: [SlugsService]
})
export class CountryslugsModule { }
