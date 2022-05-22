import {
  DeleteMajorDto,
  Major,
  MajorCreateDto,
  UpdateMajorDto,
} from './model/Major';
import { PagingParams } from 'src/app/core/model/paging-params';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MajorService {
  readonly rootURL = `${environment.apis.default.url}/api/Major`;

  pagingParams: PagingParams = new PagingParams();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetListMajor = (pagingParams: PagingParams) => {
    return this.http.get(this.rootURL + '/getlist-major', {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestCreateMajor = (Major: MajorCreateDto) => {
    return this.http.post(`${this.rootURL}/create-major`, Major);
  };

  RequestUpdateMajor = (Major: UpdateMajorDto) => {
    return this.http.put(`${this.rootURL}/update-major`, Major);
  };
  RequestDeleteMajor = (Major: DeleteMajorDto) => {
    return this.http.delete(`${this.rootURL}/detele-major`, {
      headers: this.headers,
      body: Major,
    });
  };
}
