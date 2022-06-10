export interface VMGetFavourite {
  IdJob: any;
  IdUser: any;
  IdRecruitment: any;
  UserName: string;
  CompanyOfJobs: string;
  Name: string;
  idMajor: number;
  NameMajor: string;
  Position: string;
  JobImage: string;
  JobDetail: string;
  Amount: number;
  Experience: string;
  SalaryMin: number;
  SalaryMax: number;
  WorkTime: string;
  Address: string;
  IsActive: boolean;
  isLike: boolean;
  TimeOffset: any;
  CreatedOn: any;
  UpdatedOn: any;
}
export interface VMCreateFavourite {
  idJob: any;
  IdUser: any;
  isLike: boolean;
}
export interface VMUpdateFavourite {
  idJob: any;
  IdUser: any;
  isLike: boolean;
}
export interface VMDeleteFavourite {
  idJob: any;
  IdUser: any;
  isLike: boolean;
}
