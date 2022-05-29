import { ApplyJobPopupComponent } from './popups/apply-job-popup.component';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagingParams } from 'src/app/core/model/paging-params';
import { VMGetJobDto } from 'src/app/core/model/jobs/model/Jobs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quick-detail',
  templateUrl: './quick-detail.component.html',
  styleUrls: ['./quick-detail.component.scss'],
})
export class QuickDetailComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private jobsService: JobsService,
    private __dialog: MatDialog,
  ) {}
  _PagingParams = new PagingParams();
  _ITEM_DATA : VMGetJobDto = {
    idJob: '',
    idRecruitment: '',
    companyOfJobs: '',
    recruitmentName: '',
    name: '',
    majorId: '',
    nameMajor: '',
    position: '',
    jobImage: '',
    jobDetail: '',
    amount: 0,
    experience: '',
    salaryMin: 0,
    salaryMax: 0,
    workTime: 0,
    address: '',
    isActive: false,
    dateExpire: '',
    imageUser: '',
    // imageFile: '',
  };
  getData: any;
  sub: any;
  id: any;
  ngOnInit() {
    this.getListData();
  }
  getListData() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log('params', params);
      this.id = params.get('id');
      this.jobsService
        .RequestGetItemJob(this._PagingParams, this.id)
        .subscribe((data: any) => {
          this._ITEM_DATA = data.data[0];
          console.log('data', data.data[0]);
        });
    });
  }
  onApply(){
    this.__dialog
    .open(ApplyJobPopupComponent, {
      width: '700px',
      autoFocus: false,
      data: {
        idJob: this._ITEM_DATA.idJob,
        name: this._ITEM_DATA.name,
      } as any,
    })
    .afterClosed()
    .subscribe((data: any) => {
      if (data) {
        console.log('save data successfully', data);
        this.getListData();
      }
    });
  }
}
