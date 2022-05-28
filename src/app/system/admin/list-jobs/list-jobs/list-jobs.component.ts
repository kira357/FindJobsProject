import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { UserService } from 'src/app/core/model/user/User.service';
import { ListJobsCreatePopupComponent } from 'src/app/system/home/recruitment/recruitment-list-jobs/popups/list-jobs-create-popup.component';
import { ListJobsService } from '../list-jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit {
  constructor(
    private listJobsService: ListJobsService,
    private jobsService: JobsService,
    private userService: UserService,
    private __dialog: MatDialog
  ) {}
  rowData: any;
  _PagingParams = new PagingParams();
  ngOnInit() {
    this.getListData();
  }
  columns = this.listJobsService.getColums();
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
    this.rowData = $event;
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
    console.log('onDelete', $event);
    this.jobsService.RequestDeleteJob($event).subscribe((data: any) => {
      this.getListData();
    });
  }
  async onCheck($event: any) {
    console.log('onCheck', this.rowData);
    this.rowData.isActive = $event;
    await this.userService
      .RequestUpdateActive(this.rowData)
      .subscribe((data: any) => {
        console.log('data', data.ok);
        this.getListData();
      });
  }
  onCheckedRows($event: any) {
    console.log('onCheckedRows', $event);
  }
}
