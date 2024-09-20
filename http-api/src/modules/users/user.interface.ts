export interface PublicUserData {
  nik: string;
  email: string;
  phoneNumber: string;
}

export interface User {
  nik: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean
}
