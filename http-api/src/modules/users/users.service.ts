import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PublicUserData, User } from './user.interface';
import { UserService } from './user.service.interface';

@Injectable()
export class UsersServiceImpl implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  insertOne(userData: User): Observable<PublicUserData> {
    return this.userService.insertOne(userData);
  }
}
