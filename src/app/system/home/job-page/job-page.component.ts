import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, debounceTime } from 'rxjs';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { MajorService } from 'src/app/core/model/major/major.service';
import { PagingParams } from 'src/app/core/model/paging-params';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss'],
})
export class JobPageComponent implements OnInit {
  comboxMajor: any[] = [];
  onSearch: Subject<string>;
  constructor(
    private jobsService: JobsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private SpinnerService: NgxSpinnerService,
    private majorService: MajorService
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
  timePost: any[] = ['Laster post', 'New post', 'Old post'];
  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  Amount: number;
  fakeComboxMajor: any = [
    {
      idMajor: 1,
      name: 'Công nghệ thông tin',
    },
    {
      idMajor: 2,
      name: 'Kế toán',
    },
    {
      idMajor: 3,
      name: 'Khoa học máy tính',
    },
    {
      idMajor: 4,
      name: 'Khoa học máy tính',
    },
    {
      idMajor: 5,
      name: 'Khoa học máy tính',
    },
    {
      idMajor: 6,
      name: 'Khoa học máy tính',
    },
    {
      idMajor: 7,
      name: 'Khoa học máy tính',
    },
    {
      idMajor: 8,
      name: 'Khoa học máy tính',
    },
  ];
  @Output() onClickPageChange = new EventEmitter<any>();

  ngOnInit() {
    this.getListData();
  }
  searchJob = this.formBuilder.group({
    idMajor: [''],
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
  getListData() {
    // this.SpinnerService.show();
    this.jobsService
      .RequestGetListJobActive(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        data.data.dateExpire = moment().format('DD/MM/YYYY');
        this._LIST_DATA = [...data.data];
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.SpinnerService.hide();
        }, 1000);
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
}
