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
import { TravelService } from '../service/travel.service';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('info/:country')
  async createSlugs(@Param('country') country: string) {
    console.log(country);
    return await this.travelService.getTravelInfo(country);
  }
}
