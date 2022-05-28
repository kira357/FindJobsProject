import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-admin-page-main',
  templateUrl: './admin-page-main.component.html',
  styleUrls: ['./admin-page-main.component.scss'],
})
export class AdminPageMainComponent implements OnInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = '';
  isAdmin: boolean = false;

  constructor(
    private cookieService: CookieService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private router: Router,

  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.checkLogin()
  }

  LogOut = () => {
    localStorage.removeItem('data')
    this.router.navigate(['/account/login'])
  };

  checkLogin(){
    const data = localStorage.getItem('data')
    if(data){
      const dataJson = JSON.parse(data)
      if(dataJson.data.roleName === 'Admin'){
        this.userName = dataJson.data.userName
        this.isAdmin = true
      }
    }
  }
}
