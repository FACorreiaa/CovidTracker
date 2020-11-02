import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import SlugInterface from 'src/countryslugs/models/slugs.interface';
import { SlugsDocument } from 'src/countryslugs/models/slugs.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Injectable()
export class SlugsService {
  constructor(
    @InjectModel('Slugs') private readonly slugModel: Model<SlugsDocument>,
  ) {}

  async createSlugs() {
    const data = await this.getSlug();

    const slugList = new this.slugModel();
    slugList.list = data;
    slugList.createdAt = new Date();

    await slugList.save();

    return await this.slugModel
      .find({})
      .sort([['createdAt', -1]])
      .limit(1)
      .exec();
  }

  async getAllSlugs() {
    return await this.slugModel.find().exec();
  }

  async getByCountry(iso: string) {
    return iso;
  }

  async getAllCountries() {
    return await this.slugModel.find({}, { 'list.Country': 1 }).exec();
  }

  //alterar amanha
  async getCountryList() {
    const result = await this.getSlug();
    return result.map(res => res.Country).sort();
  }

  async getSlug() {
    const result = await axios.get(`${process.env.BASE_URL}/countries`);
    return result.data;
  }
}
