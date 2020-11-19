import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { HospitalSchema } from './models/hospital.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Hospital',
        useFactory: () => {
          const schema = HospitalSchema;
          schema.pre('save', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
          });
          return schema;
        },
      },
    ]),
    CacheModule.register(),
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
