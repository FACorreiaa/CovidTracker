import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { DayService } from 'src/dayone/services/day/day.service';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';

@Controller('dayone')
export class DayController {
  constructor(private readonly dayoneService: DayService) {}

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/country/:country')
  async findDayOneByCountry(@Param('country') country: string) {
    return await this.dayoneService.findDayOneByCountry(country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('stats/country/:country')
  async findCountryStatistics(@Param('country') country: string) {
    return await this.dayoneService.findCountryStatistics(country);
  }

  @UseInterceptors(CacheInterceptor)
  @UseFilters(MongoExceptionFilter)
  @Get('total/country/:country/status/:status/live')
  async findDayOneByCountryLive(
    @Param('country') country: string,
    @Param('status') status: string,
  ) {
    return await this.dayoneService.findDayOneByCountryLive(country, status);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('all/total/country/:country')
  async findDayOneByCountryAllStatus(@Param('country') country: string) {
    return await this.dayoneService.findDayOneByCountryAllStatus(country);
  }
}
