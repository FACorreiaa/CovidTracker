import { CacheModule, Module } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryController } from './controllers/country.controller';
import { CountrySchema } from './models/country.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryslugsModule } from 'src/countryslugs/countryslugs.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: 'Country', useFactory: () => {
      const schema = CountrySchema;
      schema.pre('save', function () {
        this.update({}, { $set: { updatedAt: new Date() } });
      });
      return schema;
    },
  }]),
    CountryslugsModule,
  CacheModule.register()
  ],
  providers: [CountryService],
  controllers: [CountryController]
})
export class CountryModule { }
