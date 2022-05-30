import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  readonly rootURL = `${environment.apis.default.url}/api/CandidateJob`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetListCandidate = (pagingParams: PagingParams, Id: any) => {
    return this.http.get(`${this.rootURL}/get-list-apply/${Id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetListAllCandidate = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/get-alllist-apply`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestApplyJob = (candidate: any) => {
    return this.http.post(`${this.rootURL}/apply-job`, candidate);
  };

  RequestDownloadFile = (docFile: any): Observable<Blob> => {
    return this.http.get(`${this.rootURL}/download-file?fileName=${docFile}`, {
      responseType: 'blob',
      reportProgress: true,
    });
  };
}
