import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MajorService } from 'src/app/core/model/major/major.service';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private majorService: MajorService,
    private apiAuthenService: ApiAuthenService,
    private userService: UserService
  ) {}
  defaultImageSrc = '/assets/image/default-image.png';
  updateUser = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    phonenumber: ['', Validators.required],
    address: ['', Validators.required],
    experience: ['', Validators.required],
    imageFile: '',
    idMajor: ['', Validators.required],
    search: '',
  });
  listExperience: any[] = [
    'Dưới 1 năm',
    '1 năm',
    '2 năm',
    '3 năm',
    '4 năm',
    '5 năm',
    'Trên 5 năm',
  ];
  ngOnInit() {
    this.getCurrentUser();
  }

  data = localStorage.getItem('data');
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
  };
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
        console.log('123', this.currentUser);
      });
  }
  imageFile: { link: any; file: any; name: string } | undefined;
  files: any[] = [];
  handleChange = (evt: any) => {
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
  };
  formData = new FormData();
  onEdit() {
    console.log('onEdit', this.updateUser.value);
    this.formData.append('imageFile', this.files[0]);
    this.formData.append('firstName', this.updateUser.value.firstname);
    this.formData.append('lastName', this.updateUser.value.lastname);
    this.formData.append('phoneNumber', this.updateUser.value.phonenumber);
    this.formData.append('idMajor', this.updateUser.value.idMajor);
    this.formData.append('address', this.updateUser.value.address);
    this.formData.append('experience', this.updateUser.value.experience);

    this.userService
      .RequestUpdateInfoUser(this.formData , this.currentUser.id)
      .subscribe((data: any) => {
        console.log('data', data);
        this.updateUser.reset();
        this.getCurrentUser();
      });
  }
}
