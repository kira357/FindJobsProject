import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { RecruitmentService } from 'src/app/core/model/recruitmentJob/recruitment.service';
import {
  faUserGroup,
  faGear,
  faTimesCircle,
  faLocation,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-detail-recruitment',
  templateUrl: './detail-recruitment.component.html',
  styleUrls: ['./detail-recruitment.component.scss'],
})
export class DetailRecruitmentComponent implements OnInit {
  newArray: any[] = [];
  constructor(
    private recruitmentService: RecruitmentService,
    private _Activatedroute: ActivatedRoute
  ) {}
  faLocation = faLocation;
  faUserGroup = faUserGroup;
  faGear = faGear;
  faTimesCircle = faTimesCircle;
  _PagingParams = new PagingParams();
  _ITEM_DATA: any = {};
  _LIST_DATA: any[] = [];
  getData: any;
  sub: any;
  id: any;
  typeOfWork: any[] = [
    { value: 1, name: 'Off site' },
    { value: 2, name: 'On site' },
    { value: 3, name: 'Full time' },
    { value: 4, name: 'Part time' },
  ];
  typeCompany: any[] = [
    { value: 1, name: 'Out source' },
    { value: 2, name: 'Product' },
    { value: 3, name: 'Service' },
    { value: 4, name: 'Other' },
  ];
  ngOnInit() {
    this.getDatadetailCompany();
  }
  _DATA_FORMAT = {} as any;
  getDatadetailCompany() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.recruitmentService
        .RequestGetDetailCompany(this.id)
        .subscribe((data: any) => {
          this._ITEM_DATA = data[0];
          this._DATA_FORMAT = {
            ...this._ITEM_DATA,
            typeOfWork: this.typeOfWork.find(
              (x) => x.value == this._ITEM_DATA.typeOfWork
            )?.name,
            typeCompany: this.typeCompany.find(
              (x) => x.value == this._ITEM_DATA.typeCompany
            )?.name,
          };
          console.log('getListData', this._DATA_FORMAT);
          this._PagingParams.totalRows = data.totalCount;
        });
      this.recruitmentService
        .RequestGetAllJobsInCompany(this._PagingParams, this.id)
        .subscribe((data: any) => {
          this._LIST_DATA = [...data.data]
          console.log('getListData', this._LIST_DATA);
        });
    });
  }
}
