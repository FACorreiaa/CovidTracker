/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WIPDocument } from '../models/wip.schema';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WIPTotalDocument } from '../models/totalwip.schema';
@Injectable()
export class WipService {
  constructor(
    @InjectModel('WIP') private readonly wipModel: Model<WIPDocument>,
    @InjectModel('TotalWIP')
    private readonly totalwipModel: Model<WIPTotalDocument>,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async createWIP() {
    const data = await this.wipData();
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = data;
    const newSummary = new this.totalwipModel({
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      createdAt: new Date(),
    });
    await newSummary.save();
    return await this.totalwipModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .lean()
      .exec();
    //return result.id as string;;
  }

  async findWIPbyDate(from: Date, to: Date) {
    const data = await this.findwipData(from, to);
    const newCountrySummary = new this.wipModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    await newCountrySummary.save();

    return await this.wipModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .lean()
      .exec();
  }

  async findTotalWIPbyDate(from: Date, to: Date) {
    const data = await this.findwipData(from, to);
    const newCountrySummary = new this.wipModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();

    return await this.wipModel
      .find(
        {},
        {
          'name.TotalConfirmed': 1,
          'name.TotalDeaths': 1,
          'name.TotalRecovered': 1,
        },
      )
      .sort([['createdAt', -1]])
      .lean()
      .exec();
  }

  async findNewWIPbyDate(from: Date, to: Date) {
    const data = await this.findwipData(from, to);
    const newCountrySummary = new this.wipModel();
    newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();

    return await this.wipModel
      .find(
        {},
        { 'name.NewConfirmed': 1, 'name.NewDeaths': 1, 'name.NewRecovered': 1 },
      )
      .sort([['createdAt', -1]])
      .lean()
      .exec();
  }

  /*async findStatusWIPbyDate(from: Date, to: Date, status: string) {
    const data = await this.findwipData(from, to);
    const newCountrySummary = new this.wipModel();
    let query = {};

     newCountrySummary.name = data;
    newCountrySummary.createdAt = new Date();
    query[status] = { $arrayElemAt: ['$name.' + status, 0] };
    console.log(query);
    return await this.wipModel
      .aggregate([
        {
          //Your $match stage here
          _id: '5fb9a45378eb1931ec379cf8',
        },
        {
          $project: query,
        },
      ])
      .sort([['createdAt', -1]])
      .exec();
      //
    query[status] = 1;
    console.log(query);
    return await this.wipModel
      .find({})
      .sort([['createdAt', -1]])
      .lean()
      .exec();
  }*/

  async findwipData(from: Date, to: Date) {
    const result = await axios.get(
      `${process.env.BASE_URL}/world?from=${from}&to=${to}`,
    );

    return result.data;
  }

  async wipData() {
    const result = await axios.get(`${process.env.BASE_URL}/world/total`);
    return result.data;
  }
}
