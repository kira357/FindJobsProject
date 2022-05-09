import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly rootURL = `${environment.apis.default.url}/api/Autho`;
  readonly rootURLCompany = `${environment.apis.default.url}/api/Company`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestShowListUSer = () => {
    return this.http.get(this.rootURL + '/getall');
  };

  RequestShowListEmployee = () => {
    return this.http.get(this.rootURL + '/getallemployee', {
      headers: this.headers,
    });
  };
}
