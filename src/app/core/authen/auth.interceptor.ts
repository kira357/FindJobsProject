import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '');
    if (dataJson.token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${dataJson.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        (succ) => {},
        (err) => {
          if (err.status == 401) {
            localStorage.removeItem('data');
            this.router.navigateByUrl('/account/login');
          }
        }
      )
    );
  }
}
