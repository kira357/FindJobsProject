import { PagingParams } from './../paging-params';
import { VMCreateRole, VMDeleteRole, VMRole, VMUpdateRole } from './model/Roles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  readonly rootURL = `${environment.apis.default.url}/api/Role`;

  pagingParams: PagingParams = new PagingParams();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestCreateRole = (Role: VMCreateRole) => {
    return this.http.post(`${this.rootURL}/create-role`, Role, {
      headers: this.headers,
    });
  };

  RequestUpdateRole = (Role: VMUpdateRole) => {
    return this.http.put(`${this.rootURL}/update-role`, Role, {
      headers: this.headers,
    });
  };

  RequestDeteleRole = (Role: VMDeleteRole) => {
    return this.http.delete(`${this.rootURL}/detele-role`, {
      headers: this.headers,
      body: Role,
    });
  };

  RequestGetListRoles = (pagingParams: PagingParams) => {
    return this.http.get(this.rootURL + '/getlist-role', {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
}
