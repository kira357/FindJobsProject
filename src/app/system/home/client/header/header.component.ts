import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WINDOW } from 'src/app/window.providers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  isAdmin: boolean = false;
  data : any ; 
  dataJson :any 
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private router: Router,
    private apiAuthenService: ApiAuthenService,
    private userService: UserService,
    @Inject(WINDOW) private window: Window
  ) {}
  HostUrl: string;
  ngOnInit() {
    this.getCurrentUser();
    this.HostUrl = this.window.location.href + '/resume';
  }

  LogOut = () => {
    localStorage.removeItem('data');
    this.router.navigate(['/account/login']);
  };


  currentUser: VMGetCurrentUser = {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    roleName: '',
    experience: '',
    nameMajor: '',
    idMajor: 0,
    urlAvatar: '',
    phoneNumber: '',
    address: '',
    email: '',
  };
  getCurrentUser() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.dataJson = JSON.parse(this.data || '');
        this.apiAuthenService
          .RequestGetCurrentUser(this.dataJson.data.id)
          .subscribe((data: any) => {
            this.currentUser = data[0];
            console.log('123', this.currentUser);
          });
    }
  }
}
