import { CacheInterceptor, Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { SlugsService } from 'src/countryslugs/services/slugs/slugs.service';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';

@Controller('slugs')
export class SlugsController {
    constructor(private readonly slugService: SlugsService) { }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('list')
    async createSlugs(
    ) {
        return await this.slugService.createSlugs();
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('all')
    async getAllSlugs() {
        return await this.slugService.getAllSlugs();
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('countries/all')
    async getAllCountries() {
        return await this.slugService.getAllCountries();
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('iso/:iso')
    async getByCountry(@Param('iso') iso: string,
    ) {
        return await this.slugService.getByCountry(iso);
    }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('countries/list')
    async getCountryList() {
        return await this.slugService.getCountryList();
    }
}
