import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AllExceptionsFilter } from './validators/filter.validator';
require('newrelic');
dotenv.config();
declare const module: any;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(bodyParser.json({ limit: '500mb' }));
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Covid API')
    .setDescription('Covid tracker api')
    .setVersion('1.0')
    .addTag('covidtracker')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/spec', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`SERVER (${process.pid}) IS RUNNING ON `, process.env.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
