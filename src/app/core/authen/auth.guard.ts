// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../model/authen/Authen.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private user: AuthenService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkTokenExpiration();
  }

  checkTokenExpiration() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '');
    if (!dataJson.token) {
      this.router.navigate(['/account/login']);
      return false;
    } 
    // else {
    //   switch (dataJson.roleName) {
    //     case 'Admin':
    //       this.router.navigate(['/admin']);
    //       return true;
    //     case 'Recruitment':
    //       if (dataJson.active) {
    //         this.router.navigate(['/recruitment']);
    //         return true;
    //       }
    //       break;
    //     default:
    //       this.router.navigate(['/']);
    //       return true;
    //   }
    //   return true;
    // }
    return true;
  }
}
