import { Controller, Post, UseFilters } from '@nestjs/common';
import { EmailService } from 'src/email/services/email/email.service';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) { }

    @UseFilters(AllExceptionsFilter)
    @UseFilters(MongoExceptionFilter)
    @Post('general')
    async sendSubGeneralEmail() {
        return this.emailService.sendSubGeneralEmail();
    }
}
