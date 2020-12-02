import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryStatisticsDocument } from './models/countrystatistics.model';

@Injectable()
export class CountrystatsService {
  constructor(
    @InjectModel('CountryStatistics')
    private readonly statsModel: Model<CountryStatisticsDocument>,
  ) {}

  async getCountryDataStats(country: string) {
    return this.statsModel.find(
      { location: country },
      {
        continent: 1,
        location: 1,
        population: 1,
        population_density: 1,
        median_age: 1,
        aged_65_older: 1,
        aged_70_older: 1,
        gdp_per_capita: 1,
        extreme_poverty: 1,
        cardiovasc_death_rate: 1,
        diabetes_prevalence: 1,
        female_smokers: 1,
        male_smokers: 1,
        hospital_beds_per_thousand: 1,
        life_expectancy: 1,
        human_development_index: 1,
      },
    );
  }

  async getCountryStats(country: string) {
    return this.statsModel
      .aggregate([
        { $match: { location: country } },
        { $unwind: '$data' },
        {
          $project: {
            'data.date': 1,
            'data.total_cases_per_million': 1,
            'data.new_cases_per_million': 1,
            'data.total_deaths_per_million': 1,
            'data.new_deaths_per_million': 1,
            'data.new_deaths_smoothed_per_million': 1,
            'data.new_cases_smoothed_per_million': 1,
          },
        },
        {
          $sort: { 'data.date': -1 },
        },
        {
          $limit: 30,
        },
      ])
      .exec();
  }
}
