import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HospitalDocument = Hospital & Document;

@Schema()
class Hospital extends Document {
  @Prop()
  Entity: string;
  @Prop()
  Year: Date;
  @Prop()
  Daily_ICU_occupancy: number;
  @Prop()
  Daily_ICU_occupancy_per_million: number;
  @Prop()
  Daily_hospital_occupancy: number;
  @Prop()
  Daily_hospital_occupancy_per_million: number;
  @Prop()
  Weekly_new_ICU_admissions: number;
  @Prop()
  Weekly_new_ICU_admissions_per_million: number;
  @Prop()
  Weekly_new_hospital_admissions: number;
  @Prop()
  Weekly_new_hospital_admissions_per_million: number;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
