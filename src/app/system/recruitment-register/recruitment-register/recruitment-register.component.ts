import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/app/core/animations/fade-in-up.animation';
import { AuthenService } from 'src/app/core/model/authen/Authen.service';

@Component({
  selector: 'app-recruitment-register',
  templateUrl: './recruitment-register.component.html',
  styleUrls: ['./recruitment-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class RecruitmentRegisterComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenService: AuthenService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      nameCompany: ['', Validators.required],
      website: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      imageFile: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  formData = new FormData();
  onSubmit() {
    console.log(this.formGroup.value);
    this.formData.append('imageFile', this.files[0], this.files[0].name);
    this.formData.append('nameCompany', this.formGroup.value.nameCompany);
    this.formData.append('website', this.formGroup.value.website);
    this.formData.append('fax', this.formGroup.value.fax);
    this.formData.append('email', this.formGroup.value.email);
    this.formData.append('firstName', this.formGroup.value.firstName);
    this.formData.append('lastName', this.formGroup.value.lastName);
    this.formData.append('password', this.formGroup.value.password);
    this.authenService
      .RequestRecruitmentRegister(this.formData)
      .subscribe((data) => {
        if (data) {
          this.formGroup.reset();
          this.formData.forEach((value, key) => {
            this.formData.delete(key);
          });
          this.router.navigate(['/account/login']);
        }
      });
  }
  onCancel() {
    this.router.navigate(['/account/login']);
  }
  imageFile: { link: any; file: any; name: string } | undefined;
  files: any[] = [];
  defaultImageSrc = '/assets/image/default-image.png';
  onFileChange(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      this.files = evt.target.files;
      let file1 = <File>evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file1);
      reader.onload = (e) => {
        this.imageFile = {
          link: reader.result,
          file: this.files,
          name: evt.srcElement.files[0].name,
        };
        console.log('link: ', this.imageFile.file);
      };
    } else {
      this.imageFile = {
        link: this.defaultImageSrc,
        file: null,
        name: '',
      };
    }
  }
}
