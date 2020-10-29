import { Injectable, Logger } from '@nestjs/common';
import { InjectSendGrid } from '@ntegral/nestjs-sendgrid/dist/common/sendgrid.decorator';
import { SendGridService } from '@ntegral/nestjs-sendgrid/dist/services/sendgrid.service';
import * as dotenv from 'dotenv';
import { UserService } from 'src/user/services/user/user.service';
import { SummaryService } from 'src/summary/services/summary.service';
import { Cron, CronExpression } from '@nestjs/schedule';
dotenv.config();

@Injectable()
export class EmailService {
    private readonly logger = new Logger(UserService.name);

    constructor(private summaryService: SummaryService,
        private userService: UserService,
        @InjectSendGrid() private readonly sendMSG: SendGridService) { }
        
    @Cron(CronExpression.EVERY_10_HOURS)
    async sendSubGeneralEmail() {
        this.logger.debug('Called every 10 HOURS');

        const result = await this.userService.getAllGeneralSubs();
        const emailList = result.map((res) => res.email)
        const summary = await this.summaryService.findRecentSummary();
        const [summaryList] = summary
        const { NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered } = summaryList;
        console.log('#######################')
        console.log('emailList', emailList)
        console.log('summary', summaryList)
        const msg = {
            to: emailList, // Change to your recipient
            from: 'fernando316correia@hotmail.com', // Change to your verified sender
            templateId: 'd-997d93b3eb0f4013b335d4bfc71dae41',
            dynamic_template_data: {
                NewConfirmed,
                TotalConfirmed,
                NewDeaths,
                TotalDeaths,
                NewRecovered,
                TotalRecovered
            },
        }
        console.log(msg)
        this.sendMSG
            .sendMultiple(msg)
            .then(() => {
                console.log('MULTIPLE Email sent to: ', emailList)
            })
            .catch((error) => {
                console.error(error)
            })
    }
}
