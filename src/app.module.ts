import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SummaryModule } from './summary/summary.module';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { WipModule } from './wip/wip.module';
import { LiveModule } from './live/live.module';
import { CountryModule } from './country/country.module';
import { DayModule } from './dayone/day.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CountryslugsModule } from './countryslugs/countryslugs.module';
import { EmailModule } from './email/email.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid/dist/sendgrid.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './validators/filter.validator';
import { MailerModule } from '@nestjs-modules/mailer/dist/mailer.module';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

dotenv.config();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"FC" <fernando316correia@hotmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5295o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    ),
    SummaryModule,
    WipModule,
    LiveModule,
    CountryModule,
    DayModule,
    UserModule,
    //AuthModule,
    CountryslugsModule,
    EmailModule,
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
