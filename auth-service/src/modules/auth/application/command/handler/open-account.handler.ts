import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountFactory } from "src/modules/auth/domain/Factory/account.factory";
import { AccountRepository } from "src/modules/auth/domain/repository/account.repository";
import { OpenAccountCommand } from "../command/open-account.command";
import { Inject } from "@nestjs/common";
import { REPOSITORY_TYPES } from "src/modules/auth/domain/repository/repository.types";
import { AccountEssentialProperties } from "src/modules/auth/domain/domain/account.domain";

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand, AccountEssentialProperties> {
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.AccountRepository) private readonly repository: AccountRepository,
    private readonly accountFactory: AccountFactory
  ) {}

  //@Transactional()why do I need this?
  async execute(command: OpenAccountCommand): Promise<AccountEssentialProperties> {
    const account = this.accountFactory.create({
      ...command
    });

    account.open();

    const savedAccount = await this.repository.save(account);

    account.commit();

    return savedAccount;
  }
}