import { VMUserRegister, VMUserLogin, VMRecruitmentRegister } from './model/Authen';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  readonly rootURL = `${environment.apis.default.url}/api/Authen`;

  pagingParams: PagingParams = new PagingParams();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });


  RequestRegister = (User: VMUserRegister) => {
    return this.http
      .post(`${this.rootURL}/register`, User, { headers: this.headers })
      .pipe(retry(2));
  };

  RequestRecruitmentRegister = (User: any) => {
    return this.http
      .post(`${this.rootURL}/register-recruitment`, User);
  };
  RequestLogin = (User: VMUserLogin) => {
    return this.http.post(`${this.rootURL}/login`, User);
  };


}
