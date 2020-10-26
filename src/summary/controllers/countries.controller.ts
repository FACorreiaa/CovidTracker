import { Body, CacheInterceptor, Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';
import { CountriesService } from '../services/countries.service';

@Controller('countriessummary')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) { }

    @UseFilters(MongoExceptionFilter)
    @UseFilters(AllExceptionsFilter)
    @UseInterceptors(CacheInterceptor)
    @Get()
    async getCountrySummary(

    ) {
        return await this.countriesService.getSummaryHistory();
    }

    @UseFilters(MongoExceptionFilter)
    @UseFilters(AllExceptionsFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('all')
    async findAllCountrySummaries() {
        return await this.countriesService.findAllCountrySummaries();
    }
}
