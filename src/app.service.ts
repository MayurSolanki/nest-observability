import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './app.models';

@Injectable()
export class AppService {
  getUserData(): any {
    return {
      id: 1,
      name: 'Alice',
    };
  }

  createUserData(user: User): any {
    console.log('userObj', user);
    return {
      status: HttpStatus.CREATED,
      message: `user ${user.name} created successfully`,
    };
  }
}
