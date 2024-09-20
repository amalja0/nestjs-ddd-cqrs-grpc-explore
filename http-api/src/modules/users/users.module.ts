import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UsersController } from './users.controller';
import { UsersServiceImpl } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: ((configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: ['user'],
            protoPath: join(__dirname, '../../../proto/user/user.proto'),
            url: `localhost:${configService.get<string>('PORT')}`
          }
        }))
      }
    ])
  ],
  providers: [UsersServiceImpl],
  controllers: [UsersController]
})
export class UsersModule { }
