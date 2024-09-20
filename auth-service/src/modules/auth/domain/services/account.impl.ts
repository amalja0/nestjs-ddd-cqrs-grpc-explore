import { AggregateRoot } from "@nestjs/cqrs";
import { AccountProperties, IAccount } from "../domain/account.domain";
import { AccountOpenedEvent } from "../event/account-opened.event";

export class AccountImpl extends AggregateRoot implements IAccount {
  private readonly nik: string;
  private readonly email: string;
  private readonly phoneNumber: string;
  private readonly password: string;

  constructor(properties: AccountProperties) {
    super();
    Object.assign(this, properties);
  }

  open(): void {
    this.apply(new AccountOpenedEvent(this.nik, this.email, this.phoneNumber));
  };
}