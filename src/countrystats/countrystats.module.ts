import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrystatsController } from './countrystats.controller';
import { CountrystatsService } from './countrystats.service';
import { CountryStatisticsSchema } from './models/countrystatistics.model';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'CountryStatistics',
        useFactory: () => {
          const schema = CountryStatisticsSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
    ]),
    CacheModule.register(),
  ],
  controllers: [CountrystatsController],
  providers: [CountrystatsService],
})
export class CountrystatsModule {}
