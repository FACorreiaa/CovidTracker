import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DayOneDocument } from 'src/dayone/models/day.schema';
import axios from 'axios';
import { StatisticsDocument } from 'src/dayone/models/statistics.schema';
@Injectable()
export class DayService {
  constructor(
    @InjectModel('DayOne') private readonly dayModel: Model<DayOneDocument>,
    @InjectModel('Statistics')
    private readonly statisticsModel: Model<StatisticsDocument>,
  ) {}

  async findDayOneByCountry(country: string) {
    const data = await this.findTotalByDayOne(country);
    const newCountrySummary = new this.dayModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    await newCountrySummary.save();

    return await this.dayModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .exec();
  }

  async findCountryStatistics(country: string) {
    console.log(country);
    return this.dayModel.aggregate([
      {
        $set: {
          avgConfirmed: { $avg: '$name.Confirmed' },
        },
      },
      {
        $set: {
          stdConfirmed: { $stdDevPop: '$name.Confirmed' },
        },
      },
    ]);
  }

  async findDayOneByCountryLive(country: string, status: string) {
    const data = await this.findTotalByDayOneLive(country, status);
    const newCountrySummary = new this.dayModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    await newCountrySummary.save();

    return await this.dayModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .exec();
  }

  async findDayOneByCountryAllStatus(country: string) {
    const data = await this.findTotalByDayOneAllStatus(country);
    const newCountrySummary = new this.dayModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    await newCountrySummary.save();

    return await this.dayModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .exec();
  }

  async findTotalByDayOne(country: string) {
    const result = await axios.get(
      `${process.env.BASE_URL}/total/dayone/country/${country}`,
    );

    return result.data;
  }

  async findTotalByDayOneLive(country: string, status: string) {
    const result = await axios.get(
      `${process.env.BASE_URL}/dayone/country/${country}/status/${status}/live`,
    );

    return result.data;
  }

  async findTotalByDayOneAllStatus(country: string) {
    const result = await axios.get(
      `${process.env.BASE_URL}/dayone/country/${country}`,
    );
    return result.data;
  }
}
