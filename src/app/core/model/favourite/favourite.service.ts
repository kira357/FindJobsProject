import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../paging-params';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  readonly rootURL = `${environment.apis.default.url}/api/FavouriteJobs`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetAllListFavourite = (pagingParams: PagingParams) => {
    return this.http.get(`${this.rootURL}/get-all-list-Favourite`, {
      headers: this.headers,
      params: {
        IndexPage: pagingParams.currentPage,
        PageSize: pagingParams.pageSize,
      },
    });
  };

  RequestCreateFavourite= (favourite: any) => {
    return this.http.post(`${this.rootURL}/create-favourite`, favourite);
  };
}
