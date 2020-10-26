import { CacheInterceptor, Controller, Get, Param, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';
import { SummaryService } from '../services/summary.service';

@Controller('summary')
export class SummaryController {
    constructor(private readonly summaryService: SummaryService) { }


    @UseFilters(MongoExceptionFilter)
    @UseFilters(AllExceptionsFilter)
    @UseInterceptors(CacheInterceptor)
    @Get()
    async findRecentSummary() {
        return await this.summaryService.findRecentSummary();
    }

    @UseFilters(MongoExceptionFilter)
    @UseFilters(AllExceptionsFilter)
    @UseInterceptors(CacheInterceptor)
    @Get('all')
    async findAllSummaries() {
        return await this.summaryService.findAllSummaries();
    }
}
