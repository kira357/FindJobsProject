import {
  VMCreateBlogDto,
  VMDeleteBlogDto,
  VMUpdateBlogDto,
} from './model/Blog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  readonly rootURL = `${environment.apis.default.url}/api/Blog`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetListPost = (pagingParams: PagingParams, Id: any) => {
    return this.http.get(`${this.rootURL}/getlist-post/${Id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestGetItemPost = (pagingParams: PagingParams, Id: any) => {
    return this.http.get(`${this.rootURL}/getitem-post/${Id}`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetAllListPost = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/getlist-post`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };
  RequestGetAllListPostActive = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/getlist-post-active`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestCreatePost = (post: FormData) => {
    return this.http.post(`${this.rootURL}/create-post`, post);
  };

  RequestUpdatePost = (post: any) => {
    return this.http.put(`${this.rootURL}/update-post`, post);
  };
  RequestDeletePost = (post: VMDeleteBlogDto) => {
    return this.http.delete(`${this.rootURL}/delete-post`, {
      headers: this.headers,
      body: post,
    });
  };
  RequestUpdateApprovedPost = (post: any) => {
    return this.http.put(`${this.rootURL}/update-approved`, post);
  };
}
