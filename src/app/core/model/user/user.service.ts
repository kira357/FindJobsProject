import { VMCreateUser, VMDeleteUser, VMUpdateUser } from './model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly rootURL = `${environment.url}/api/User`;

  pagingParams: PagingParams = new PagingParams();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetList = (pagingParams: PagingParams) => {
    return this.http.get(this.rootURL + '/getall', {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetAllListWithNoRole = (pagingParams: PagingParams) => {
    return this.http.get(this.rootURL + '/getAllListWithNoRole', {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestCreateUser = (User: VMCreateUser) => {
    return this.http.post(`${this.rootURL}/create-user`, User, {
      headers: this.headers,
    });
  };
  RequestUpdateUser = (User: VMUpdateUser, Id: any) => {
    return this.http.put(`${this.rootURL}/update-user/${Id}`, User, {
      headers: this.headers,
    });
  };
  RequestUpdateUserRole = (User: any) => {
    return this.http.put(`${this.rootURL}/update-user-role`, User, {
      headers: this.headers,
    });
  };

  RequestUpdateInfoUser = (User: FormData, Id: any) => {
    return this.http.put(`${this.rootURL}/update-information/${Id}`, User);
  };

  RequestUpdateActive = (job: any) => {
    return this.http.put(`${this.rootURL}/update-active`, job);
  };

  RequestDeteleUser = (User: VMDeleteUser, Id: any) => {
    return this.http.delete(`${this.rootURL}/delete-user/${Id}`, {
      headers: this.headers,
      body: User,
    });
  };
}
