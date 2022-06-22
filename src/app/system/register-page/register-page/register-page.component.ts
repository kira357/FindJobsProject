import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/app/core/animations/fade-in-up.animation';
import { AuthenService } from 'src/app/core/model/authen/Authen.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class RegisterPageComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenService: AuthenService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  

  onSubmit() {
    // console.log(this.formGroup.value);
    this.authenService.RequestRegister(this.formGroup.value).subscribe(
      (data) => {
        if(data){
          this.formGroup.reset();
          this.router.navigate(['/account/login']);
        }
      }
    )  
  }
  onCancel() {
    this.router.navigate(['/account/login']);
  }
}
