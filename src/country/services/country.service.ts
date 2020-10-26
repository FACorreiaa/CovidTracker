import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios'
import { Model } from 'mongoose';
import { CountryDocument } from 'src/country/models/country.model';
import { SlugsService } from 'src/countryslugs/services/slugs/slugs.service';
@Injectable()
export class CountryService {
    constructor(
        @InjectModel('Country') private readonly countryModel: Model<CountryDocument>) { }

    async findCountryTotalData(country: string) {
        const data = await this.findCountryData(country)
        const newCountrySummary = new this.countryModel();
        newCountrySummary.name = data;
        newCountrySummary.createdAt = new Date();
        await newCountrySummary.save();


        return await this.countryModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
    }

    async findCountryTotalByCountry(country: string, status: string, from: Date, to: Date) {
        const data = await this.findDataTotal(country, status, from, to)
        const newCountrySummary = new this.countryModel();
        newCountrySummary.name = data;
        newCountrySummary.createdAt = new Date();
        await newCountrySummary.save();


        return await this.countryModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
    }

    async findTotalByCountryLive(country: string, from: Date, to: Date) {
        const data = await this.findCountryDataLive(country, from, to)
        const newCountrySummary = new this.countryModel();
        newCountrySummary.name = data;
        newCountrySummary.createdAt = new Date();
        await newCountrySummary.save();


        return await this.countryModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
    }

    async findTotalByCountryAllStatus(country: string, status: string, from: Date, to: Date) {
        const data = await this.findCountryAllStatus(country, status, from, to)
        const newCountrySummary = new this.countryModel();
        newCountrySummary.name = data;
        newCountrySummary.createdAt = new Date();
        await newCountrySummary.save();


        return await this.countryModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
    }

    async findTotalByCountry(country: string, status: string, from: Date, to: Date) {
        const data = await this.findByCountry(country, status, from, to)
        const newCountrySummary = new this.countryModel();
        newCountrySummary.name = data;
        newCountrySummary.createdAt = new Date();
        await newCountrySummary.save();


        return await this.countryModel.find({}).sort([['createdAt', -1]]).limit(1).exec()
    }

    //#region 
    /*API AUX CALLS*/
    //#endregion

    async findCountryData(country: string) {
        const result = await axios.get(`${process.env.BASE_URL}/total/country/${country}`)

        return result.data
    }

    async findDataTotal(country: string, status: string, from: Date, to: Date) {
        const result = await axios.get(`${process.env.BASE_URL}/country/${country}/status/${status}?from=${from}&to=${to}`)

        return result.data
    }


    async findCountryDataLive(country: string, from: Date, to: Date) {
        const result = await axios.get(`${process.env.BASE_URL}/country/${country}?from=${from}&to=${to}`)

        return result.data
    }

    async findCountryAllStatus(country: string, status: string, from: Date, to: Date) {
        const result = await axios.get(`${process.env.BASE_URL}/country/${country}/status/${status}/live?from=${from}&to=${to}`)

        return result.data
    }

    async findByCountry(country: string, status: string, from: Date, to: Date) {
        const result = await axios.get(`${process.env.BASE_URL}/total/country/${country}/status/${status}?from=${from}&to=${to}`)

        return result.data
    }


}
