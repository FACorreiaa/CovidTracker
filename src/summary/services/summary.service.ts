import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Model } from 'mongoose';
import { SummaryDocument } from '../models/summary.schema'
@Injectable()
export class SummaryService {
    constructor(
        @InjectModel('Summary') private readonly summaryModel: Model<SummaryDocument>,

    ) { }


    private readonly logger = new Logger(SummaryService.name);

    @Cron(CronExpression.EVERY_5_HOURS)
    async findRecentSummary() {
        this.logger.debug('Called every 5 HOURS');
        const data = await this.summaryData()
        const { Message, Global } = data;
        const { NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered } = Global;
        const newSummary = new this.summaryModel({
            Message,
            NewConfirmed,
            TotalConfirmed,
            NewDeaths,
            TotalDeaths,
            NewRecovered,
            TotalRecovered,
            createdAt: new Date()
        })
        await newSummary.save();
        return this.summaryModel.find().sort('-createdAt').limit(1).exec()



    }

    async findAllSummaries() {
        return this.summaryModel.find();
    }

    async summaryData() {
        const result = await axios.get(`${process.env.BASE_URL}/summary`)
        return result.data;
    }
}
