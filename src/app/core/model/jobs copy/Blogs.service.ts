import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';
import { VMDeleteJobDto, VMJobDto, VMUpdateJobDto } from './model/Blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  readonly rootURL = `${environment.apis.default.url}/api/Job`;

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

  RequestCreateJob = (job: any) => {
    return this.http.post(`${this.rootURL}/create-Job`, job);
  };

  RequestUpdateJob = (job: any) => {
    return this.http.put(`${this.rootURL}/update-Job`, job);
  };
  RequestDeleteJob = (job: VMDeleteJobDto) => {
    return this.http.delete(`${this.rootURL}/delete-Job`, {
      headers: this.headers,
      body: job,
    });
  };
}
