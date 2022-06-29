import { PagingParams } from './../paging-params';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatRecruitmentService {
  readonly rootURL = `${environment.apis.default.url}/api/Message`;

  pagingParams: PagingParams = new PagingParams();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestCreateMessage = (message: any) => {
    return this.http.post(`${this.rootURL}/create-message`, message, {
      headers: this.headers,
    });
  };
  // getUserReceivedMessages = (userId: string) => {
  //   return this.http.get(`${this.rootURL}/received-messages/${userId}`, {
  //     headers: this.headers,
  //   });
  // };
  getUserReceivedMessages(userId:string) {
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
