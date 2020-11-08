import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DayController } from './controllers/day/day.controller';
import { DayOneSchema } from './models/day.schema';
import { StatisticsSchema } from './models/statistics.schema';
import { DayService } from './services/day/day.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'DayOne',
        useFactory: () => {
          const schema = DayOneSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
      {
        name: 'Statistics',
        useFactory: () => {
          const schema = StatisticsSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
    ]),
    CacheModule.register(),
  ],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
