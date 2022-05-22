export interface VMUserRegister {
  email: string;
  password: string;
  firstName: string;
  userName: string;
  fullName: string;
  description: string;
  lastName: string;
  roleName: string;
  isActive: boolean;
  address: string;
}
export interface VMUserLogin {
  Email: string;
  Password: string;
  RememberMe: boolean;
}
