import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { UsersServiceImpl } from './users.service';

interface PublicUserData {
  readonly nik: string;
  readonly email: string;
  readonly phoneNumber: string;
}

@Controller('user-client')
export class UsersController {
  constructor(private userService: UsersServiceImpl){}

  @Post()
  createOne(@Body() userData: User): Observable<PublicUserData> {
    Logger.debug(userData);
    return this.userService.insertOne(userData)
  }

}
