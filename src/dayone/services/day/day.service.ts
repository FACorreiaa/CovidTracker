import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DayOneDocument } from 'src/dayone/models/day.schema';
import axios from 'axios';
@Injectable()
export class DayService {
  constructor(
    @InjectModel('DayOne') private readonly dayModel: Model<DayOneDocument>,
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

  async findAverageByCountry(country: string) {
    console.log(country);
    const result = this.dayModel.aggregate(
      [
        { $unwind: '$name' },
        { $match: { 'name.Country': country } },
        {
          $group: { _id: '$_id', average: { $avg: '$name.Confirmed' } },
        },
      ],
      function(err, result) {
        console.log(err);
        console.log(result);
        if (err) {
          console.log(err);
        }
        console.log(result);
      },
    );
    console.log(result);
    return result;
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
