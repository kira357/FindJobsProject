export interface UserDto {
  tenantId?: string;
  userName?: string;
  normalizedUserName?: string;
  name?: string;
  surname?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  passwordHash?: string;
  securityStamp?: string;
  isExternal: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;

  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth?: Date;
  gender?: string;
  comment: string;
  address?: string;
  idMajor: string;
  urlAvatar: string;
  description: string;
}

export interface VMGetUser {
  id: any;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  roleName: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  idMajor: string;
  urlAvatar: string;
  description: string;
  isActive: boolean;
}
export interface VMGetCurrentUser {
  id: any;
  fullName: string;
  firstName: string;
  lastName: string;
  roleName: string;
  experience: string;
  nameMajor: string;
  idMajor: number;
  urlAvatar: string;
  phoneNumber: string;
  address: string;
  email: string;
}
export interface VMCreateUser {
  lastName: string;
  firstName: string;
  userName: string;
  fullName: string;
  gender: string;
  email: string;
  idMajor: string;
  roleName: string;
  password: string;
  description: string;
  address: string;
  phoneNumber: string;
  isActive: boolean;
}
export interface VMUpdateUser {
  id: any;
  lastName: string;
  firstName: string;
  userName: string;
  fullName: string;
  gender: string;
  email: string;
  idMajor: string;
  password: string;
  description: string;
  address: string;
  phoneNumber: string;
  isActive: boolean;
}
export interface VMDeleteUser {
  id: any;
  lastName: string;
  firstName: string;
  userName: string;
  fullName: string;
  gender: string;
  email: string;
  idMajor: string;
  password: string;
  description: string;
  address: string;
  phoneNumber: string;
  isActive: boolean;
}
