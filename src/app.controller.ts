import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './app.models';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): any {
    return this.appService.getUserData();
  }

  @Post('')
  createUser(@Body() user: User): any {
    return this.appService.createUserData(user);
  }
}
