import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HospitalDocument } from './models/hospital.model';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel('Hospital')
    private readonly hospitalModel: Model<HospitalDocument>,
  ) {}

  async getHospitalData(country: string) {
    return this.hospitalModel.find();
  }

  async getICUData(country: string) {
    return this.hospitalModel.find(
      { Entity: country },
      {
        Daily_ICU_occupancy: 1,
        Daily_ICU_occupancy_per_million: 1,
        Weekly_new_ICU_admissions: 1,
        Weekly_new_ICU_admissions_per_million: 1,
      },
    );
  }
}
