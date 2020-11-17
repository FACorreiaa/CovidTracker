import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { LiveDocument } from 'src/live/models/live.schema';
@Injectable()
export class LiveService {
  constructor(
    @InjectModel('Live') private readonly liveModel: Model<LiveDocument>,
  ) {}

  async findLiveDataByCountry(country: string) {
    const data = await this.findLiveData(country);
    const newCountrySummary = new this.liveModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    await newCountrySummary.save();

    return await this.liveModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .exec();
  }

  //work in progress
  async findLiveDataByCountryAfterDate(
    country: string,
    status: string,
    date: Date,
  ) {
    const data = await this.findLiveDataAfterDate(country, status, date);
    const newCountrySummary = new this.liveModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    await newCountrySummary.save();

    return await this.liveModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .exec();
  }

  async findLiveData(country: string) {
    const result = await axios.get(
      `${process.env.BASE_URL}/live/country/${country}`,
    );

    return result.data;
  }

  async findLiveDataAfterDate(country: string, status, date: Date) {
    const result = await axios.get(
      `${process.env.BASE_URL}/live/country/${country}/status/${status}/date/${date}`,
    );
    return result.data;
  }
}
