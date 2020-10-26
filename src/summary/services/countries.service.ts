import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountrySummaryDocument } from '../models/countrysummary.schema';
import axios from 'axios'
import { Cron, CronExpression } from '@nestjs/schedule';
import { CountryDocument } from 'src/country/models/country.model';
import { subCountry } from '../models/subCountry.interface';
@Injectable()
export class CountriesService {
    constructor(@InjectModel('CountrySummary') private readonly countrysummaryModel: Model<CountrySummaryDocument>
    ) { }

    private readonly logger = new Logger(CountriesService.name);

    /*
    @Cron(CronExpression.EVERY_10_MINUTES)
    async getCountrySummary(id: string) {
        const result = await this.getCountrySummaryData()
        const { Countries } = result.data;
        this.logger.debug('Called every 10 minutes');

        return await this.countrysummaryModel.findOneAndUpdate({ _id: id },
            { countrySummary: Countries },
            { upsert: true })
    }

    @Cron(CronExpression.EVERY_10_HOURS)
    async getSummaryHistory() {
        this.logger.debug('Called every 10 HOURS');
        return await this.createCountrySummary();
    }*/

    @Cron(CronExpression.EVERY_5_HOURS)
    async getSummaryHistory() {
        this.logger.debug('Called every 5 HOURS');
        const result = await this.getCountrySummaryData()
        const { Countries } = result.data;
        const newCountrySummary = new this.countrysummaryModel({
            countrySummary: Countries,
            createdAt: new Date()
        });

        newCountrySummary.save()
        const res = await this.countrysummaryModel.find({}, (err, doc) => {
            if (err) {
                console.log('Error', err)
                throw err
            } else {
                return doc

            }
        }).sort('-countrySummary.Date').limit(1).exec()
        const [data] = res;
        return data;
    }

    async findAllCountrySummaries() {
        return this.countrysummaryModel.find();
    }

    async getCountrySummaryList(countries: string[]): Promise<subCountry[]> {
        const data = await this.getSummaryHistory();
        const { countrySummary } = data;
        return countrySummary.filter((country) => countries.includes(country.Country))
    }

    async getCountrySummaryData() {
        const result = await axios.get(`${process.env.BASE_URL}/summary`);
        return result;
    }


}
