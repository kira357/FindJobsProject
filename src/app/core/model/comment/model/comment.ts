export interface UserComment {
  id: number;
  idUser: any;
  idJob: any;
  urlAvatar: string;
  userName: string;
  commentMsg: string;
  commentDate: Date;
  commentOn: string;
}
export interface Reply {
  id: number;
  IdUser: any;
  idJob: any;
  idComment: number;
  ReplyMsg: string;
}
