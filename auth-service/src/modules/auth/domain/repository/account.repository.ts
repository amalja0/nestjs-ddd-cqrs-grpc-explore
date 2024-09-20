import { AccountEssentialProperties, IAccount } from "../domain/account.domain";

export interface AccountRepository {
  save: (account: IAccount) => Promise<AccountEssentialProperties>;
}