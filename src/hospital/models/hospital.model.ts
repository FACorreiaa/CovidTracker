import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HospitalInfoDocument = HospitalInfo & Document;

class SubHospitalInfo extends Document {
  @Prop()
  Entity: string;
  @Prop()
  Year: Date;
  @Prop()
  Daily_ICU_occupancy: string;
  @Prop()
  Daily_ICU_occupancy_per_million: string;
  @Prop()
  Daily_hospital_occupancy: string;
  @Prop()
  Daily_hospital_occupancy_per_million: string;
  @Prop()
  Weekly_new_ICU_admissions: string;
  @Prop()
  Weekly_new_ICU_admissions_per_million: string;
  @Prop()
  Weekly_new_hospital_admissions: string;
  @Prop()
  Weekly_new_hospital_admissions_per_million: string;
}
@Schema()
class HospitalInfo extends Document {
  @Prop()
  country: [SubHospitalInfo];
}

export const HospitalInfoSchema = SchemaFactory.createForClass(HospitalInfo);
