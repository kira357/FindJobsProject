import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  constructor(private jobsService: JobsService) {}
  timePost: any[] = ['Laster post', 'New post', 'Old post'];
  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  Amount : number

  ngOnInit() {
    this.getListData();
  }

  getListData() {
    this.jobsService
      .RequestGetListJob(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        data.data.dateExpire = moment().format( 'DD/MM/YYYY');
        this._LIST_DATA = [...data.data];
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
}
