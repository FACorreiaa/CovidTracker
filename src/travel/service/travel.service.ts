import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { TravelDocument } from '../models/travel.model';
@Injectable()
export class TravelService {
  constructor(
    @InjectModel('Travel') private readonly travelModel: Model<TravelDocument>,
  ) {}

  async getTravelInfo(country: string) {
    return await this.saveTravelInfo(country);
  }

  async saveTravelInfo(country: string) {
    const travelResult = await this.getTravelInfoFromAPI(country);
    const newTravelInfo = new this.travelModel();
    newTravelInfo.Country = travelResult.Country.Country;
    newTravelInfo.Recommendation = travelResult.Recommendation;
    newTravelInfo.Level = travelResult.Level.Level;
    newTravelInfo.LevelDescr = travelResult.Level.LevelDesc;
    newTravelInfo.Date = travelResult.Level.Date;
    newTravelInfo.Notes = travelResult.Notes;
    return newTravelInfo.save();
  }

  async getTravelInfoFromAPI(country: string) {
    const headersRequest = {
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
    };
    /*const result = await this.httpService.get(
          `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr`,
          { params: { ingr: ingr.toString() }, headers: headersRequest },
        );*/
    const result = await axios.get(
      `${process.env.BASE_URL}/premium/travel/country/${country}`,
      { headers: headersRequest },
    );
    console.log(result.data);

    return result.data;
  }
}
