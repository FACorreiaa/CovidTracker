import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';
import { WipService } from '../services/wip.service';

@Controller('wip')
export class WipController {
  constructor(private readonly wipService: WipService) {}

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total')
  async getTotalWip() {
    return await this.wipService.createWIP();
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/date')
  async findWIPbyDate(@Query('from') from: Date, @Query('to') to: Date) {
    return await this.wipService.findWIPbyDate(from, to);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/date/total')
  async findTotalWIPbyDate(@Query('from') from: Date, @Query('to') to: Date) {
    return await this.wipService.findTotalWIPbyDate(from, to);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/date/new')
  async findNewWIPbyDate(@Query('from') from: Date, @Query('to') to: Date) {
    return await this.wipService.findNewWIPbyDate(from, to);
  }

  //future todo
  /*@UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('total/date/status/:status')
  async findStatusWIPbyDate(
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Param('status') status: string,
  ) {
    return await this.wipService.findStatusWIPbyDate(from, to, status);
  }*/
}
