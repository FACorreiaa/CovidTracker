/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WIPDocument } from '../models/wip.schema';
import axios from 'axios'
import { Cron, CronExpression } from '@nestjs/schedule';
import { WIPTotalDocument } from '../models/totalwip.schema';
@Injectable()
export class WipService {
    constructor(@InjectModel('WIP') private readonly wipModel: Model<WIPDocument>,
        @InjectModel('TotalWIP') private readonly totalwipModel: Model<WIPTotalDocument>
    ) { }




    @Cron(CronExpression.EVERY_10_HOURS)
    async createWIP() {
        const data = await this.wipData()
        const { TotalConfirmed, TotalDeaths, TotalRecovered } = data;
        const newSummary = new this.totalwipModel({
            TotalConfirmed,
            TotalDeaths,
            TotalRecovered,
            createdAt: new Date()
        })
        await newSummary.save();
        return await this.totalwipModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
        //return result.id as string;;
    }



    async findWIPbyDate(from: Date, to: Date) {
        const data = await this.findwipData(from, to)
        const newCountrySummary = new this.wipModel();
        newCountrySummary.name = data;
        newCountrySummary.createdAt = new Date();
        await newCountrySummary.save();


        return await this.wipModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
    }

    async findwipData(from: Date, to: Date) {
        const result = await axios.get(`${process.env.BASE_URL}/world?from=${from}&to=${to}`)

        return result.data
    }

    async wipData() {
        const result = await axios.get(`${process.env.BASE_URL}/world/total`)
        return result.data;
    }
}
