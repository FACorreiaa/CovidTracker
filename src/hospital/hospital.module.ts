import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { HospitalInfoSchema } from './models/hospital.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'hospitalinfo',
        useFactory: () => {
          const schema = HospitalInfoSchema;
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
