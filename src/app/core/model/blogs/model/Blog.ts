export interface VMCreateBlogDto {
  idUser: any;
  title: string;
  imageFile: File;
  image: string;
  summary: string;
  idMajor: string;
  description: string;
  datePost: Date;
  status: string;
}
export interface VMGetBlogDto {
  idBlog: any;
  idUser: any;
  title: string;
  image: string;
  summary: string;
  idMajor: string;
  nameMajor: string;
  description: string;
  datePost: Date;
  status: string;
  view: number;
  isActive: boolean;
  hotPost: boolean;
}
export interface VMUpdateBlogDto {
  idBlog: any;
  idUser: any;
  title: string;
  imageFile: File;
  image: string;
  summary: string;
  idMajor: string;
  description: string;
  datePost: Date;
  status: string;
  view: number;
  isActive: boolean;
  hotPost: boolean;
}
export interface VMDeleteBlogDto {
  idBlog: any;
  idUser: any;
  title: string;
  imageFile: File;
  image: string;
  summary: string;
  idMajor: string;
  description: string;
  datePost: Date;
  status: string;
  view: number;
  isActive: boolean;
  hotPost: boolean;
}
