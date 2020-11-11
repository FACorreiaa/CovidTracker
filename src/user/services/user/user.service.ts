import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CountriesService } from '../../../summary/services/countries.service';
import { SubscribeCountryDocument } from 'src/user/models/subcountry.schema';
import { SubscribeGeneralDocument } from 'src/user/models/subgeneral.schema';
import { UserDocument, UserRole } from 'src/user/models/users.schema';
import { SendGridService } from '@ntegral/nestjs-sendgrid/dist/services';
import { InjectSendGrid } from '@ntegral/nestjs-sendgrid/dist/common';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
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

    private authService: AuthService,
    private countrySummaryService: CountriesService,
    @InjectSendGrid() private readonly sendMSG: SendGridService,
    private readonly mailerService: MailerService,
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
      console.log('error');
      throw error;
    }
  }

  async subscribeCountryInfo(email: string, country: string) {
    const isSubbed = await this.checkForCountrySubUser(email, country);
    console.log('isSubbed', isSubbed);
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
              console.log('Error:', err);
              throw err;
            } else {
              if (doc == null) {
                const newCountry = new this.subCountryModel();
                (newCountry.email = email), newCountry.countries.push(country);
                newCountry.createdAt = new Date();
                const res = newCountry.save();
                console.log('New doc created', newCountry);
                return res;
              } else {
                doc.countries.push(country);
                const res = doc.save();
                console.log('Updated', doc);
                return res;
              }
            }
          })
          .exec();
      }
    } catch (error) {
      console.log('error');
      throw error;
    }

    //return await newSub.save();
  }

  async register(user: UserDocument) {
    if (!user.username && !user.password && !user.email) {
      return 'Fill al fields!';
    }
    const pass = await this.authService.hashPassword(user.password);
    const newUser = new this.userModel();
    const checkIfExists = await this.userModel.find({
      username: user.username,
      email: user.email,
    });
    console.log(checkIfExists);
    if (checkIfExists.length > 0) {
      return 'User with that data already exists!';
    }

    newUser.username = user.username;
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.password = pass;
    newUser.role = UserRole.USER;

    const result = newUser.save();
    return result;
  }

  async login(user: UserDocument) {
    const result = await this.validateUser(user.email, user.password);
    if (result) {
      const jwt = await this.authService.generateJWT(user);
      return { access_token: jwt };
    } else {
      return 'Wrong credentials';
    }
  }

  async deleteOne(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }

  async updateRoleOfUser(id: string, role: string) {
    return await this.userModel.findOneAndUpdate({ _id: id }, { role: role });
  }

  async validateUser(email: string, password: string) {
    const result = await this.userModel.findOne({ email: email });
    const match: boolean = await this.authService.comparePasswords(
      password,
      result.password,
    );
    if (match) {
      const { password, ...res } = result;
      return res;
    } else {
      throw Error;
    }
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
    console.log(email);
    console.log(country);

    const result = await this.subCountryModel
      .find({
        email: email,
        countries: { $in: [country] },
      })
      .exec();
    console.log(result);

    return result;
  }

  async findOne(id: string) {
    return await this.userModel
      .findOne({ _id: id })
      .select('+password')
      .exec();
  }

  async getAllGeneralSubs() {
    console.log('getsubs');
    return await this.subGeneralModel.find({}, { email: 1 }).exec();
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async sendSubCountryEmail() {
    this.logger.debug('Called every 10 HOURS');
    return await this.subCountryModel
      .find({}, async (err, doc) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log(doc);
        const [data] = doc;
        const details = await this.countrySummaryService.getCountrySummaryList(
          data.countries,
        );
        const [countryDetails] = details;
        const emailList = doc.map(res => res.email);
        details.forEach(element => {
          console.log('ELEMENT', element);
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
          console.log(msg);
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
