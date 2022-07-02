import { BlogService } from './../../../../core/model/blogs/Blogs.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, debounceTime } from 'rxjs';
import { MajorService } from 'src/app/core/model/major/major.service';
import { RecruitmentService } from 'src/app/core/model/recruitmentJob/recruitment.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  comboxMajor: any[] = [];
  onSearch: Subject<string>;

  data = localStorage.getItem('data');
  constructor(
    private jobsService: JobsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private SpinnerService: NgxSpinnerService,
    private majorService: MajorService,
    private apiAuthenService: ApiAuthenService,
    private recruitmentService: RecruitmentService
  ) {
    this.onSearch = new Subject();
    this.onSearch.pipe(debounceTime(400)).subscribe((str) => {
      let comboxfilter = this.comboxMajor.filter(
        (x) => x.name.indexOf(str) > -1
      );
      str ? (this.comboxMajor = comboxfilter) : this.getComboxMajor();
    });
  }
  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  Amount: number;
  currentDate : any = moment().format('DD/MM/YYYY');
  @Output() onClickPageChange = new EventEmitter<any>();
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
  newCurrent : any ={};

  newArray: any = [];
  searchJob = this.formBuilder.group({
    idMajor: 0,
    keySearch: '',
    search: '',
    from: 0,
    to: 0,
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

  ngOnInit() {
    this.getListData();
    this.getAllCompany();
    this.getComboxMajor();
    this.getListBlog();
    if(this.data !== null){
      this.getCurrentUser()
    }
  }

  getListData() {
    this.jobsService
      .RequestGetListJobActive(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        data.data.dateExpire = moment().format('DD/MM/YYYY');
        this._LIST_DATA = [...data.data];
        this.Amount = data.totalCount;
        this._LIST_DATA = this._LIST_DATA.slice(0, 5);
        this.Amount = 5;
        this._PagingParams.totalRows = 5;
      });
  }
  onpageChange(evt: any) {
    this._PagingParams.currentPage = evt;
    console.log('onpageChange', evt);
  }
  onClickQuickDetail(idJob: any) {
    this.router.navigate(['/quick-detail', idJob], {
      queryParams: {
        debug: true,
      },
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
  listCompany: any[] = [];
  getAllCompany() {
    this.recruitmentService
      .RequestGetListCompany(this._PagingParams)
      .subscribe((data: any) => {
        this.listCompany = data.data;
      });
  }
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
        this.jobsService
          .RequestGetJobFilterByMajor(
            this._PagingParams,
            this.currentUser.idMajor,
            this.currentUser.experience
          )
          .subscribe((job: any) => {
            console.log('job', job);
            job.data.updatedOn = moment(job.data.updatedOn).format('DD/MM/YYYY');
            this._LIST_DATA = [...job.data];
          });
      });
  }
  select() {}
  newDataSearch: any[] = [];
  searchJobByKeyWord() {
    this.jobsService
      .RequestGetJobFilter(this._PagingParams, this.searchJob.value)
      .subscribe((data: any) => {
        this.newDataSearch = [...data.data];
        this._LIST_DATA = [...this.newDataSearch];
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
        this.searchJob.value.idMajor = 0;
      });
  }
  _LIST_BLOG: any[] = [];
  getListBlog() {
    this.blogService
      .RequestGetAllListPostActive(this._PagingParams)
      .subscribe((data: any) => {
        this._LIST_BLOG = [...data.data];
        this.newArray = this._LIST_BLOG.slice(0, 2);
        console.log('newArray', this.newArray);
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
}
