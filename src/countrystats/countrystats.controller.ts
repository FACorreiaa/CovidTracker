import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';
import { CountrystatsService } from './countrystats.service';

@Controller('countrystats')
export class CountrystatsController {
  constructor(private readonly statsService: CountrystatsService) {}

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/data/:country')
  async getCountryDataStats(@Param('country') country: string) {
    return await this.statsService.getCountryDataStats(country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/stats/:country')
  async getCountryStats(@Param('country') country: string) {
    return await this.statsService.getCountryStats(country);
  }
}
