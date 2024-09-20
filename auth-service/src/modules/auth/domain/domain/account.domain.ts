export type AccountEssentialProperties = Readonly<
Required<{
    nik: string;
    email:string;
    phoneNumber: string;
  }>
>;

export type AccountOptionalProperties = Readonly<
  Partial<{
    password: string;
  }>
>

export type AccountProperties = AccountEssentialProperties & Required<AccountOptionalProperties>;

export interface IAccount {
  open: () => void;
  commit: () => void;
}