import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OpenAccountHandler } from "./application/command/handler/open-account.handler";
import { AccountFactory } from "./domain/Factory/account.factory";
import { REPOSITORY_TYPES } from "./domain/repository/repository.types";
import { AuthEntity } from "./infrastructure/entity/auth.entity";
import { AccountRepositoryImpl } from "./infrastructure/repository/account-repository.impl";
import { AuthController } from "./interface/controller/auth.controller";


@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), CqrsModule],
  providers: [OpenAccountHandler,
    {
      provide: REPOSITORY_TYPES.repositories.AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    AccountFactory,],
  controllers: [AuthController],
})
export class AuthModule { }