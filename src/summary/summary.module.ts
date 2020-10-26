import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryController } from './controllers/summary.controller';
import { SummarySchema } from './models/summary.schema'
import { SummaryService } from './services/summary.service';
import { CountrySummarySchema } from './models/countrysummary.schema';
import { CountriesController } from './controllers/countries.controller';
import { CountriesService } from './services/countries.service';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
@Module({
    imports: [MongooseModule.forFeatureAsync([{
        name: 'Summary', useFactory: () => {
            const schema = SummarySchema;
            schema.pre('update', function () {
                this.update({}, { $set: { updatedAt: new Date() } });
            });
            return schema;
        },
    }, {
        name: 'CountrySummary', useFactory: () => {
            const schema = CountrySummarySchema;
            schema.pre('update', function () {
                this.update({}, { $set: { updatedAt: new Date() } });
            });
            return schema;
        },
    }]),
    CacheModule.register(),
    forwardRef(() => EmailModule),
    forwardRef(() => UserModule)
    ],
    controllers: [SummaryController, CountriesController],
    providers: [SummaryService, CountriesService],
    exports: [SummaryService, CountriesService]
})
export class SummaryModule { }
