import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { OpenAccountCommand } from "../../application/command/command/open-account.command";
import { AuthEntity } from "../../infrastructure/entity/auth.entity";
import { AccountEssentialProperties } from "../../domain/domain/account.domain";

@Controller()
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @GrpcMethod('UserService', 'InsertOne')
  async openAccount(account: AuthEntity, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<AccountEssentialProperties> {
    const command = new OpenAccountCommand(account.nik, account.email, account.phoneNumber, account.password);
    const execute: AccountEssentialProperties = await this.commandBus.execute(command);
    
    return execute;
  }
}