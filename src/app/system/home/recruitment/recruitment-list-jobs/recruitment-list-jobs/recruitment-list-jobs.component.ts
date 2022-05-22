import { RecruitmentListJobsService } from './recruitment-list-jobs.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PagingParams } from 'src/app/core/model/paging-params';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { ListJobsCreatePopupComponent } from '../popups/list-jobs-create-popup.component';

@Component({
  selector: 'app-recruitment-list-jobs',
  templateUrl: './recruitment-list-jobs.component.html',
  styleUrls: ['./recruitment-list-jobs.component.scss'],
})
export class RecruitmentListJobsComponent implements OnInit {
  constructor(
    private recruitmentListJobsService: RecruitmentListJobsService,
    private jobsService: JobsService,
    private __dialog: MatDialog
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this.getListData();
  }
  columns = this.recruitmentListJobsService.getColums();
  _LIST_DATA: any = [];
  _LIST_ITEM: {} = {};

  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    this.jobsService
      .RequestGetListJob(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData after pagin', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  getListData() {
    this.jobsService
      .RequestGetListJob(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  onRowClick($event: any) {
    console.log('onRowClick', $event);
  }
  onEdit($event: any): void {
    console.log('onEdit', $event);
    this.__dialog
      .open(ListJobsCreatePopupComponent, {
        width: 'auto',
        autoFocus: false,
        data: {
          address: $event.address,
          amount: $event.amount,
          companyOfJobs: $event.companyOfJobs,
          dateExpire: $event.dateExpire,
          experience: $event.experience,
          idJob: $event.idJob,
          idRecruitment: $event.idRecruitment,
          isActive: $event.isActive,
          jobDetail: $event.jobDetail,
          jobImage: $event.jobImage,
          idMajor: $event.idMajor,
          name: $event.name,
          position: $event.position,
          recruitmentName: $event.recruitmentName,
          salaryMax: $event.salaryMax,
          salaryMin: $event.salaryMin,
          workTime: $event.workTime,
        } as any,
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getListData();
        }
      });
  }
  onDelete($event: any) {
    // console.log('onDelete', $event);
    // this.majorService.RequestDeleteMajor($event).subscribe((data: any) => {
    //   this.getListData();
    // });
  }
  onCheckedRows($event : any){
    console.log('onCheckedRows', $event);
  }
}
