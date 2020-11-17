import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountriesService } from '../../../summary/services/countries.service';
import { SubscribeCountryDocument } from 'src/user/models/subcountry.schema';
import { SubscribeGeneralDocument } from 'src/user/models/subgeneral.schema';
import { UserDocument } from 'src/user/models/users.schema';
import { SendGridService } from '@ntegral/nestjs-sendgrid/dist/services';
import { InjectSendGrid } from '@ntegral/nestjs-sendgrid/dist/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ContactDocument } from 'src/user/models/contact.schema';
import { IContact } from 'src/user/models/contact.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel('SubscribeGeneral')
    private readonly subGeneralModel: Model<SubscribeGeneralDocument>,
    @InjectModel('SubscribeCountry')
    private readonly subCountryModel: Model<SubscribeCountryDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Contact')
    private readonly contactModel: Model<ContactDocument>,
    private countrySummaryService: CountriesService,
    @InjectSendGrid() private readonly sendMSG: SendGridService,
  ) {}

  async subscribeGeneralInfo(email: string) {
    const newSub = new this.subGeneralModel();
    const isSubbed = await this.checkForSubUser(email);
    try {
      if (isSubbed.length > 0) {
        return false;
      } else {
        newSub.email = email;
        newSub.createdAt = new Date();
        return await newSub.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async subscribeCountryInfo(email: string, country: string) {
    const isSubbed = await this.checkForCountrySubUser(email, country);
    try {
      if (isSubbed.length > 0) {
        return false;
      } else {
        //const subCountry = new this.subCountryModel();
        /*subCountry.email = email;
                subCountry.countries.push(country);
                return subCountry.save();*/
        await this.subCountryModel
          .findOne({ email }, (err, doc) => {
            if (err) {
              throw err;
            } else {
              if (doc == null) {
                const newCountry = new this.subCountryModel();
                (newCountry.email = email), newCountry.countries.push(country);
                newCountry.createdAt = new Date();
                const res = newCountry.save();
                return res;
              } else {
                doc.countries.push(country);
                const res = doc.save();
                return res;
              }
            }
          })
          .exec();
      }
    } catch (error) {
      throw error;
    }

    //return await newSub.save();
  }

  async deleteOne(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }

  async findByMail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  //#region
  /*AUX METHODS*/
  //#endregion
  async checkForSubUser(email: string) {
    const result = await this.subGeneralModel.find({ email: email }).exec();
    return result;
  }

  async checkForCountrySubUser(email: string, country: string) {
    const result = await this.subCountryModel
      .find({
        email: email,
        countries: { $in: [country] },
      })
      .exec();

    return result;
  }

  async findOne(id: string) {
    return await this.userModel
      .findOne({ _id: id })
      .select('+password')
      .exec();
  }

  async getAllGeneralSubs() {
    return await this.subGeneralModel.find({}, { email: 1 }).exec();
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async sendSubCountryEmail() {
    this.logger.debug('Called every 10 HOURS');
    return await this.subCountryModel
      .find({}, async (err, doc) => {
        if (err) {
          throw err;
        }
        const [data] = doc;
        const details = await this.countrySummaryService.getCountrySummaryList(
          data.countries,
        );
        const [] = details;
        const emailList = doc.map(res => res.email);
        details.forEach(element => {
          const msg = {
            to: emailList, // Change to your recipient
            from: 'fernando316correia@hotmail.com', // Change to your verified sender
            templateId: 'd-f14c9b777a0d465a922a89c6d9f06936',
            dynamic_template_data: {
              Country: element.Country,
              NewConfirmed: element.NewConfirmed,
              TotalConfirmed: element.TotalConfirmed,
              NewDeaths: element.NewDeaths,
              TotalDeaths: element.TotalDeaths,
              NewRecovered: element.NewRecovered,
              TotalRecovered: element.TotalRecovered,
            },
          };
          this.sendMSG
            .sendMultiple(msg)
            .then(() => {
              console.log('MULTIPLE Email sent to: ', emailList);
            })
            .catch(error => {
              console.error(error);
            });
        });

        return doc;
      })
      .exec();
  }

  async getAllCountriesByEmail(email: string) {
    return await this.subCountryModel.find({ email }, { countries: 1 }).exec();
  }

  async postContactMessage(contact: IContact) {
    const newContact = new this.contactModel();
    newContact.name = contact.name;
    newContact.email = contact.email;
    newContact.message = contact.message;
    newContact.createdAt = new Date();
    return newContact.save();
  }
}
