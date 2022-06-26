export interface ChatRecruitment {
  idChat: number;
  idSender: string;
  idReceiver: string;
  type: string;
  messages: string;
  timeSend: string;
  connectionId: string;
}
export interface VMGetChatRecruitment {
  idChat: string;
  idSender: string;
  idReceiver: string;
  messages: string;
  timeSend: string;
  connectionId: string;
}
export interface VMCreateChatRecruitment {
  idChat: number;
  idSender: string;
  idReceiver: string;
  type: string;
  messages: string;
  timeSend: string;
  connectionId: string;
}
export interface VMUpdateChatRecruitment {
  idChat: string;
  idSender: string;
  idReceiver: string;
  messages: string;
  timeSend: string;
  connectionId: string;
}
