import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  handleLogout = () => {
    // if (this.cookieService.check('user')) {
    //   this.cookieService.delete('user');
    //   this.cookieService.delete('username');
    // }
  };
}
