import { CacheInterceptor, Controller, Get, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';
import { WipService } from '../services/wip.service';

@Controller('wip')
export class WipController {
    constructor(private readonly wipService: WipService) { }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('total')
    async getTotalWip(
    ) {
        return await this.wipService.createWIP();

    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('total/date')
    async findWIPbyDate(
        @Query('from') from: Date,
        @Query('to') to: Date,

    ) {
        return await this.wipService.findWIPbyDate(from, to);
    }
}
