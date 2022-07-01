import { PagingParams } from './../paging-params';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageDto } from './model/messageDto';

@Injectable({
  providedIn: 'root',
})
export class ChatRecruitmentService {
  readonly rootURL = `${environment.url}/api/Message`;
  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  pagingParams: PagingParams = new PagingParams();
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  RequestCreateMessage = (message: any) => {
    return this.http.post(`${this.rootURL}/create-message`, message, {
      headers: this.headers,
    });
  };

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
  getUserReceivedMessages(userId: any) {
    return this.http.get(`${this.rootURL}`, {
      headers: this.headers,
    });
  }
  getAllMessage = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/received-messages`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
}
