import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss'],
})
export class RecruitmentComponent implements OnInit {
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
      if(dataJson.data.roleName === 'Recruitment'){
        this.userName = dataJson.data.userName
        this.isAdmin = true
      }
    }
  }
}
