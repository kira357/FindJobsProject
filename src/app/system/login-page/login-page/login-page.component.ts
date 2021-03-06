import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/app/core/animations/fade-in-up.animation';
import { AuthenService } from 'src/app/core/model/authen/Authen.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenService: AuthenService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    localStorage.removeItem("data");
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  dataRespone: any = [];
  onSubmit() {
    // console.log(this.formGroup.value);
    this.authenService
      .RequestLogin(this.formGroup.value)
      .subscribe((data:any) => {
        if (data.ok !== null) {
          this.dataRespone = {
            data : data,
          };
          console.log(this.dataRespone);
          localStorage.setItem("data", JSON.stringify(this.dataRespone));
          if(this.dataRespone.data.roleName === 'Admin' || data.ok === 'Admin'){
            this.router.navigate(['/admin']);
          }
          if(this.dataRespone.data.roleName === 'Recruitment'){
            this.router.navigate(['/recruitment']);
          }
          if(this.dataRespone.data.roleName === 'Student'){
            this.router.navigate(['/home']);
          }
        }else{
          alert("Email or Password is incorrect");
        }
      });
  }
}
