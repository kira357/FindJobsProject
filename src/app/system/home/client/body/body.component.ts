import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  constructor(
    private jobsService: JobsService,
    private router: Router,
    private SpinnerService: NgxSpinnerService
  ) {}
  timePost: any[] = ['Laster post', 'New post', 'Old post'];
  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  Amount: number;
  @Output() onClickPageChange = new EventEmitter<any>();

  ngOnInit() {
    this.getListData();
  }

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
  onpageChange(evt: any) {
    this._PagingParams.currentPage = evt;
    console.log('onpageChange', evt);
  }
  onClickQuickDetail(idJob: any) {
    this.router.navigate(['/home/quick-detail', idJob], {
      queryParams: {
        debug: true,
      },
    });
  }
}
