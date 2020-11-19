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
  @Get('country/hospital/:country')
  async getHospitalData(@Param('country') country: string) {
    return await this.statsService.getHospitalData(country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('country/data/:country')
  async getICUData(@Param('country') country: string) {
    return await this.statsService.getICUData(country);
  }
}
