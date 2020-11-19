import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryStatisticsDocument = CountryStatistics & Document;

class subData extends Document {
  @Prop()
  date: Date;
  @Prop()
  new_cases: number;
  @Prop()
  new_deaths: number;
  @Prop()
  new_cases_per_million: number;
  @Prop()
  new_deaths_per_million: number;
}
@Schema()
class CountryStatistics extends Document {
  @Prop()
  continent: string;
  @Prop()
  location: string;
  @Prop()
  population: number;
  @Prop()
  population_density: number;
  @Prop()
  median_age: number;
  @Prop()
  aged_65_older: number;
  @Prop()
  aged_70_older: number;
  @Prop()
  gdp_per_capita: number;
  @Prop()
  cardiovasc_death_rate: number;
  @Prop()
  diabetes_prevalence: number;
  @Prop()
  handwashing_facilities: number;
  @Prop()
  hospital_beds_per_thousand: number;
  @Prop()
  life_expectancy: number;
  @Prop()
  human_development_index: number;
  @Prop()
  data: [subData];
}

export const CountryStatisticsSchema = SchemaFactory.createForClass(
  CountryStatistics,
).index({
  'data.location': 1,
});
