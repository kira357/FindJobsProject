export interface VMJobDto {
  id: any;
  idRecruitment: string;
  companyOfJobs: string;
  name: string;
  majorId: string;
  position: string;
  jobImage: string;
  jobDetail: string;
  amount: number;
  experience: string;
  salaryMin: any;
  salaryMax: any;
  workTime: number;
  address: string;
  isActive: boolean;
  dateExpire: any;
  imageFile: File;
}
export interface VMGetJobDto {
  idJob: any;
  idRecruitment: string;
  companyOfJobs: string;
  recruitmentName: string;
  name: string;
  majorId: string;
  nameMajor: string;
  position: string;
  jobImage: string;
  jobDetail: string;
  amount: number;
  experience: string;
  salaryMin: any;
  salaryMax: any;
  workTime: number;
  address: string;
  isActive: boolean;
  dateExpire: any;
  imageUser: any;
  // imageFile: File;
}
export interface VMUpdateJobDto {
  idJob: any;
  idRecruitment: any;
  companyOfJobs: string;
  name: string;
  idMajor: string;
  position: string;
  jobImage: string;
  jobDetail: string;
  amount: number;
  experience: string;
  salaryMin: any;
  salaryMax: any;
  workTime: number;
  address: string;
  isActive: boolean;
  dateExpire: any;
  imageFile: File;
}
export interface VMDeleteJobDto {
  id: any;
  idRecruitment: string;
  companyOfJobs: string;
  name: string;
  majorId: string;
  position: string;
  jobImage: string;
  jobDetail: string;
  amount: number;
  experience: string;
  salaryMin: any;
  salaryMax: any;
  workTime: number;
  address: string;
  isActive: boolean;
  dateExpire: any;
  imageFile: File;
}
