import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelController } from './controller/travel.controller';
import { TravelSchema } from './models/travel.model';
import { TravelService } from './service/travel.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Travel',
        useFactory: () => {
          const schema = TravelSchema;
          schema.pre('update', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
    ]),
    CacheModule.register(),
  ],
  controllers: [TravelController],
  providers: [TravelService],
  exports: [TravelService],
})
export class TravelModule {}
