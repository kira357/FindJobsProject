import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';
import { VMDeleteJobDto, VMJobDto, VMUpdateJobDto } from './model/Jobs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  readonly rootURL = `${environment.url}/api/Job`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetListJob = (pagingParams: PagingParams) => {
    return this.http.get(this.rootURL + '/getlist-job', {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetItemJob = (pagingParams: PagingParams, Id: any) => {
    return this.http.get(`${this.rootURL}/getitem-job/${Id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetJobFilterByMajor = (
    pagingParams: PagingParams,
    IdMajor: any,
    Experience: any
  ) => {
    return this.http.get(`${this.rootURL}/get-job-filter-major`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
        Experience: Experience,
        IdMajor: IdMajor,
      },
    });
  };
  RequestGetJobFilter = (pagingParams: PagingParams, filter: any) => {
    return this.http.get(`${this.rootURL}/getlist-job-filter`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
        KeySearch: filter.keySearch,
        IdMajor: filter.idMajor,
      },
    });
  };

  RequestGetListJobActive = (pagingParams: PagingParams) => {
    return this.http.get(this.rootURL + '/getlist-Job-active', {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestCreateJob = (job: any) => {
    return this.http.post(`${this.rootURL}/create-job`, job);
  };

  RequestUpdateJob = (job: any) => {
    return this.http.put(`${this.rootURL}/update-job`, job);
  };
  RequestDeleteJob = (job: VMDeleteJobDto) => {
    return this.http.delete(`${this.rootURL}/delete-job`, {
      headers: this.headers,
      body: job,
    });
  };
}
