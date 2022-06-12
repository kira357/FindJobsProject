import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { MajorService } from 'src/app/core/model/major/major.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';

@Component({
  selector: 'app-admin-page-login',
  templateUrl: './recruitment-information.component.html',
  styleUrls: ['./recruitment-information.component.scss'],
})
export class RecruitmentInformationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private majorService: MajorService,
    private apiAuthenService: ApiAuthenService,
    private userService: UserService
  ) {
    this.onSearch = new Subject();
    this.onSearch.pipe(debounceTime(100)).subscribe((str) => {
      console.log('onSearch', str);
      let comboxfilter = this.comboxMajor.filter(
        (x) => x.name.indexOf(str) > -1
      );
      console.log('comboxfilter', comboxfilter);
      str ? (this.comboxMajor = comboxfilter) : this.getComboxMajor();
    });
  }
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
  private _search: string;
  set search(value: string) {
    if (this._search != value) {
      this._search = value;
      if (this.onSearch) {
        this.onSearch.next(value);
      }
    }
  }
  get search() {
    return this._search;
  }
  comboxMajor: any[] = [];
  listExperience: any[] = [
    {value : 0 , name : 'Dưới 1 năm'},
    {value : 1 , name : '1 năm'},
    {value : 2 , name : '2 năm'},
    {value : 3 , name : '3 năm'},
    {value : 4 , name : '4 năm'},
    {value : 5 , name : '5 năm'},
    {value : 6 , name : 'Trên 5 năm'},
  ];
  _PagingParams = new PagingParams();
  onSearch: Subject<string>;
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
  ngOnInit() {
    this.getCurrentUser();
  }
  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }

  data = localStorage.getItem('data');
  currentUser: VMGetCurrentUser;
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
        console.log('123', this.currentUser);
      });
  }

  openEdit: boolean = false;
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
        this.openEdit = false;
        this.updateUser.reset();
        this.getCurrentUser();
      });
  }
  onOpenEdit() {
    if (this.openEdit) {
      this.openEdit = false;
    } else {
      this.openEdit = true;
    }
  }
  onReset() {
    this.updateUser.reset();
  }
}
