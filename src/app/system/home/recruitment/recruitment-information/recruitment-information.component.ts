import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { MajorService } from 'src/app/core/model/major/major.service';
import { PagingParams } from 'src/app/core/model/paging-params';

@Component({
  selector: 'app-admin-page-login',
  templateUrl: './recruitment-information.component.html',
  styleUrls: ['./recruitment-information.component.scss'],
})
export class RecruitmentInformationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private majorService: MajorService,
    private jobService: JobsService
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
  employeeCreated = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    phonenumber: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    roleName: ['', Validators.required],
    experience: ['', Validators.required],
    imageFile: '',
    idMajor: ['', Validators.required],
    password: ['', Validators.required],
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
  gender: any[] = ['Nam', 'Nữ'];
  listExperienceJobs: any[] = [
    'Không yêu cầu kinh nghiệm',
    '1 năm kinh nghiệm',
    '2 năm kinh nghiệm',
    '3 năm kinh nghiệm',
    '4 năm kinh nghiệm',
    '5 năm kinh nghiệm',
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
  }
  ngOnInit() {}
  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }
  onAdd(){}
  onReset() {
    this.employeeCreated.reset();
  }
}
