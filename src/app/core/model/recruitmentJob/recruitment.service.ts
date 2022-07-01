import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentService {
  readonly rootURL = `${environment.apis.default.url}/api/Recruitment`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetListJob = (pagingParams: PagingParams, Id: any) => {
    return this.http.get(`${this.rootURL}/getlist-recruiment/${Id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestGetListCompany = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/get-list-company`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetDetailCompany = (id: any) => {
    return this.http.get(`${this.rootURL}/get-detail-company/${id}`, {
      headers: this.headers,
    });
  };
  RequestGetAllJobsInCompany = (pagingParams: PagingParams, id: any) => {
    return this.http.get(`${this.rootURL}/get-all-jobs-company/${id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetCurrentRecruitment = (Id: any) => {
    return this.http.get(`${this.rootURL}/get-current-recruitment/${Id}`, {
      headers: this.headers,
    });
  };
  RequestUpdateCurrentRecruitment = (data: any, Id: any) => {
    return this.http.put(`${this.rootURL}/update-recruiment/${Id}`, data);
  };

  RequestUpdateActive = (job: any) => {
    return this.http.put(`${this.rootURL}/update-active`, job);
  };
}
