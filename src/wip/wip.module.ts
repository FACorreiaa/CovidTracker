import { CacheModule, Module } from '@nestjs/common';
import { WipService } from './services/wip.service';
import { WipController } from './controllers/wip.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WIPSchema } from './models/wip.schema';
import { TotalWIPSchema } from './models/totalwip.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: 'WIP', useFactory: () => {
      const schema = WIPSchema;
      schema.pre('save', function () {
        this.update({}, { $set: { updatedAt: new Date() } });
      });
      return schema;
    },
  }, {
    name: 'TotalWIP', useFactory: () => {
      const schema = TotalWIPSchema;
      schema.pre('save', function () {
        this.update({}, { $set: { updatedAt: new Date() } });
      });
      return schema;
    },
  }]),
  CacheModule.register()],
  providers: [WipService],
  controllers: [WipController]
})
export class WipModule { }
