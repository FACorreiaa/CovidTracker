import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';
import { CountriesService } from '../services/countries.service';

@Controller('countriessummary')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getCountrySummary() {
    return await this.countriesService.getSummaryHistory();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('all')
  async findAllCountrySummaries() {
    return await this.countriesService.findAllCountrySummaries();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('top/new/deaths')
  async getTopNewDeaths() {
    return await this.countriesService.getTopNewDeaths();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('top/new/recovered')
  async getTopNewRecovered() {
    return await this.countriesService.getTopNewRecovered();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('top/new/confirmed')
  async getTopNewConfirmed() {
    return await this.countriesService.getTopNewConfirmed();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('top/total/deaths')
  async getTopTotalDeaths() {
    return await this.countriesService.getTopTotalDeaths();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('top/total/recovered')
  async getTopTotalRecovered() {
    return await this.countriesService.getTopTotalRecovered();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('top/total/confirmed')
  async getTopTotalConfirmed() {
    return await this.countriesService.getTopTotalConfirmed();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('daily/country/:country')
  async getDailyCountrySUmmary(@Param('country') country: string) {
    return await this.countriesService.getDailyCountrySUmmary(country);
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('new/confirmed')
  async findNewConfirmed() {
    return await this.countriesService.findNewConfirmed();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('new/recovered')
  async findNewRecovered() {
    return await this.countriesService.findNewRecovered();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('new/deaths')
  async findNewDeaths() {
    return await this.countriesService.findNewDeaths();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/confirmed')
  async findTotalConfirmed() {
    return await this.countriesService.findTotalConfirmed();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/deaths')
  async findTotalDeaths() {
    return await this.countriesService.findTotalDeaths();
  }

  @UseFilters(MongoExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/recovered')
  async findTotalRecovered() {
    return await this.countriesService.findTotalRecovered();
  }
}
