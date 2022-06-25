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
}
