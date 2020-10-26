import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './services/email/email.service';
import { EmailController } from './controllers/email/email.controller';
import { UserModule } from 'src/user/user.module';
import { SummaryModule } from 'src/summary/summary.module';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [
    forwardRef(() => CountryModule),
    forwardRef(() => UserModule),
    forwardRef(() => SummaryModule)
  ],
  providers: [EmailService],
  controllers: [EmailController]
})
export class EmailModule { }
