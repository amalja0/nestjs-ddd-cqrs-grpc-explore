import { ICommand } from "@nestjs/cqrs";

export class OpenAccountCommand implements ICommand {
  constructor (
    readonly nik: string,
    readonly email: string,
    readonly phoneNumber: string,
    readonly password: string
  ) {}
}