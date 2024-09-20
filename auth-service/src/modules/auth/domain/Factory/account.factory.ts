import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { AccountProperties, IAccount } from "../domain/account.domain";
import { AccountImpl } from "../services/account.impl";

type CreateAccountOptions = Readonly<{
  nik: string;
  email: string;
  phoneNumber: string;
  password: string;
}>;

export class AccountFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateAccountOptions): IAccount {
    return this.eventPublisher.mergeObjectContext(
      new AccountImpl({
        ...options
      })
    )
  }

  reconstitute(properties: AccountProperties): IAccount {
    return this.eventPublisher.mergeObjectContext(
      new AccountImpl(properties),
    )
  }
}