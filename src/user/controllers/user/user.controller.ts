import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Param,
  UseFilters,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IContact } from 'src/user/models/contact.interface';
import { UserDocument } from 'src/user/models/users.schema';
import { UserService } from 'src/user/services/user/user.service';
import { AllExceptionsFilter } from 'src/validators/filter.validator';
import { MongoExceptionFilter } from 'src/validators/mongoose.filter';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @Post('sub/general')
  async subscribeGeneralInfo(@Body('email') email: string) {
    return await this.userService.subscribeGeneralInfo(email);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @Post('sub/country')
  async subscribeCountryInfo(
    @Body('email') email: string,
    @Body('country') country: string,
  ) {
    return await this.userService.subscribeCountryInfo(email, country);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @Post('message/admin')
  async postContactMessage(@Body() contact: IContact) {
    return await this.userService.postContactMessage(contact);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @Post('register')
  async register(@Body() user: UserDocument) {
    return await this.userService.register(user);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @Post('login')
  async login(@Body() user: UserDocument) {
    return await this.userService.login(user);
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('sub/general')
  async getAllGeneralSubs() {
    return await this.userService.getAllGeneralSubs();
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @Post('sub/email/countries')
  async getAllCountrySubs() {
    return await this.userService.sendSubCountryEmail();
  }

  @UseFilters(AllExceptionsFilter)
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  @Get('all/countries/:email')
  async getAllCountriesByEmail(@Param('email') email: string) {
    return await this.userService.getAllCountriesByEmail(email);
  }
  //getAllCountriesByEmail
}
