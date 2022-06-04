import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthenService {
  readonly rootURL = 'http://localhost:5000/api/User';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestGetCurrentUser = (id: any) => {
    return this.http.get(`${this.rootURL}/getcurrent-user/${id}`, {
      headers: this.headers,
    });
  };

}
