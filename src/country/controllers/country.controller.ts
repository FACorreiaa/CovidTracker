import { CacheInterceptor, Controller, Get, HttpException, HttpStatus, Param, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { CountryService } from 'src/country/services/country.service';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @UseInterceptors(CacheInterceptor)
    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @Get('total/:country')
    async findWIPbyDate(
        @Param('country') country: string,

    ) {
        return await this.countryService.findCountryTotalData(country);
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get(':country/status/:status')
    async findCountryTotalByCountry(
        @Param('country') country: string,
        @Param('status') status: string,
        @Query('from') from: Date,
        @Query('to') to: Date

    ) {
        return await this.countryService.findCountryTotalByCountry(country, status, from, to);
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('live/:country/date')
    async findTotalByCountryLive(
        @Param('country') country: string,
        @Query('from') from: Date,
        @Query('to') to: Date

    ) {
        return await this.countryService.findTotalByCountryLive(country, from, to);
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('total/:country/status/:status/date/live')
    async findTotalByCountryAllStatus(
        @Param('country') country: string,
        @Param('status') status: string,
        @Query('from') from: Date,
        @Query('to') to: Date

    ) {
        return await this.countryService.findTotalByCountryAllStatus(country, status, from, to);
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('total/:country/status/:status/date')
    async findTotalByCountry(
        @Param('country') country: string,
        @Param('status') status: string,
        @Query('from') from: Date,
        @Query('to') to: Date

    ) {
        return await this.countryService.findTotalByCountry(country, status, from, to);
    }
}
