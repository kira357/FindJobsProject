import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';
import { VMDeleteJobDto } from './model/Jobs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  readonly rootURL = `${environment.apis.default.url}/api/Job`;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

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
  RequestGetJobFilterByMajor = (pagingParams: PagingParams, IdMajor: any, Experience: any) => {
    return this.http.get(`${this.rootURL}/get-job-filter-major`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
        Experience: Experience,
        IdMajor: IdMajor
      },
    });
  };

  RequestGetListJobActive = (pagingParams: PagingParams): Observable<any> => new Observable<any>(observer => {
    return observer.next({});
  });

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
