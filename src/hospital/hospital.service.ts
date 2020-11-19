import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HospitalInfoDocument } from './models/hospital.model';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel('hospitalinfo')
    private readonly hospitalModel: Model<HospitalInfoDocument>,
  ) {}

  async getHospitalData(country: string) {
    return await this.hospitalModel.find(
      { 'country.Entity': country },
      {
        'country.Year': 1,
        'country.Daily_hospital_occupancy': 1,
        'country.Daily_hospital_occupancy_per_million': 1,
        'country.Weekly_new_hospital_admissions': 1,
        'country.Weekly_new_hospital_admissions_per_million': 1,
      },
    );
  }

  async getICUData(country: string) {
    return this.hospitalModel.find(
      { 'country.Entity': country },
      {
        'country.Year': 1,
        'country.Daily_ICU_occupancy': 1,
        'country.Daily_ICU_occupancy_per_million': 1,
        'country.Weekly_new_ICU_admissions': 1,
        'country.Weekly_new_ICU_admissions_per_million': 1,
      },
    );
  }
}
