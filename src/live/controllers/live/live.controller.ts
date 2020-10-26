import { CacheInterceptor, Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { LiveService } from 'src/live/services/live/live.service';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';

@Controller('live')
export class LiveController {
    constructor(private readonly liveService: LiveService) { }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('country/:country')
    async findLiveDataByCountry(
        @Param('country') country: string
    ) {
        return this.liveService.findLiveDataByCountry(country);
    }


    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('country/:country/status/:status/date/:date')
    async findLiveDataByCountryAfterDate(
        @Param('country') country: string,
        @Param('status') status: string,
        @Param('date') date: Date

    ) {
        return await this.liveService.findLiveDataByCountryAfterDate(country, status, date);
    }
}
