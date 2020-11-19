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
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly statsService: HospitalService) {}

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/occupancy/:country')
  async getOccupancyData(@Param('country') country: string) {
    return await this.statsService.getOccupancyData(country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/occupancy/million/:country')
  async getOccupancyDataPerMillion(@Param('country') country: string) {
    return await this.statsService.getOccupancyDataPerMillion(country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/admisions/:country')
  async getAdmissionsData(@Param('country') country: string) {
    return await this.statsService.getAdmissionsData(country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/admissions/million/:country')
  async getAdmissionsPerMillionData(@Param('country') country: string) {
    return await this.statsService.getAdmissionsPerMillionData(country);
  }
}
