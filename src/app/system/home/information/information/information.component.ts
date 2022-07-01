import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MajorService } from 'src/app/core/model/major/major.service';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { VMGetJobDto } from 'src/app/core/model/jobs/model/Jobs';
import { PagingParams } from 'src/app/core/model/paging-params';
import { Subject, debounceTime } from 'rxjs';

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
    private userService: UserService,
    private jobsService: JobsService,
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
  onSearch: Subject<string>;
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
    {value : 0 , name : 'Dưới 1 '},
    {value : 1 , name : '1 '},
    {value : 2 , name : '2 '},
    {value : 3 , name : '3 '},
    {value : 4 , name : '4 '},
    {value : 5 , name : '5 '},
    {value : 6 , name : 'Trên 5 '},
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
    email: '',
  };
  comboxMajor: any[] = [];
  _PagingParams = new PagingParams();
  _LIST_DATA: VMGetJobDto[] = [];
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
        this.jobsService.RequestGetJobFilterByMajor(this._PagingParams,this.currentUser.idMajor,this.currentUser.experience).subscribe((job: any) => {
          console.log('job', job);
          this._LIST_DATA = job.data;
        }
        );
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
    this.formData.append('idMajor', this.updateUser.value.idMajor);
    this.formData.append('phoneNumber', this.updateUser.value.phonenumber);
    this.formData.append('address', this.updateUser.value.address);
    this.formData.append('experience', this.updateUser.value.experience);

    this.userService
      .RequestUpdateInfoUser(this.formData , this.currentUser.id)
      .subscribe((data: any) => {
        console.log('data', data);
        this.updateUser.reset();
        this.formData.forEach((value, key) => {
          this.formData.delete(key);
        }
        );
        this.getCurrentUser();
      });
  }
  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }
}
