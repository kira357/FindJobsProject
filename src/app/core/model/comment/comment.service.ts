import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  readonly rootURL = `${environment.url}/api/Comment`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetAllListComment = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/get-all-list-comment`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestGetCommentUserOnJobs = (pagingParams: PagingParams, Id: any) => {
    return this.http.get(`${this.rootURL}/get-comment-user/${Id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestCreateComment = (comment: any) => {
    return this.http.post(`${this.rootURL}/create-comment`, comment);
  };

  RequestReplyComment = (reply: any) => {
    return this.http.post(`${this.rootURL}/reply-comment`, reply);
  };
}
