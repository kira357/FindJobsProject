import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';

@Component({
  selector: 'app-save-jobs',
  templateUrl: './save-jobs.component.html',
  styleUrls: ['./save-jobs.component.scss'],
})
export class SaveJobsComponent implements OnInit {
  _PagingParams = new PagingParams();
  _LIST_DATA: any[];
  constructor(
    private jobsService: JobsService,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getListData();
  }
  onpageChange(evt: any) {
    this._PagingParams.currentPage = evt;
    console.log('onpageChange', evt);
  }
  Amount: number;
  getListData() {
    this.SpinnerService.show();
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
}
