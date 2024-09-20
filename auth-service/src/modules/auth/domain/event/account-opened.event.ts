import { IEvent } from "@nestjs/cqrs";

export class AccountOpenedEvent implements IEvent {
  constructor(readonly nik: string, readonly email: string, readonly phoneNumber: string) {}
}