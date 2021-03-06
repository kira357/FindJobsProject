import { CommentService } from './../../../../../core/model/comment/comment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/core/model/candidateJob/candidate.service';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { VMGetJobDto } from 'src/app/core/model/jobs/model/Jobs';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ApplyJobPopupComponent } from '../../quick-detail/popups/apply-job-popup.component';
import { UserComment } from 'src/app/core/model/comment/model/comment';
import { FavouriteService } from 'src/app/core/model/favourite/favourite.service';
import { VMCreateFavourite } from 'src/app/core/model/favourite/model/favourite';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail-job-body',
  templateUrl: './detail-job-body.component.html',
  styleUrls: ['./detail-job-body.component.scss'],
})
export class DetailJobBodyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private jobsService: JobsService,
    private candidateService: CandidateService,
    private __dialog: MatDialog,
    private favouriteService: FavouriteService,
    private commentService: CommentService,
    private SpinnerService: NgxSpinnerService
  ) {}

  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  _ITEM_DATA: VMGetJobDto = {
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
  };
  commentArray: UserComment[] = [];
  getData: any;
  sub: any;
  id: any;
  ngOnInit() {
    this.getListData();
  }
  isActive: boolean = false;
  isLike: boolean = false;
  getListData() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '');
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.SpinnerService.show(); // show the spinner
      console.log('params', params);
      this.id = params.get('id');
      this.jobsService
        .RequestGetItemJob(this._PagingParams, this.id)
        .subscribe((data: any) => {
          if (data != null) {
            this._ITEM_DATA = data.data[0];
          }
        });
      this.jobsService
        .RequestGetListJobActive(this._PagingParams)
        .subscribe((data: any) => {
          console.log('getListData', data);
          data.data.dateExpire = moment().format('DD/MM/YYYY');
          this._LIST_DATA = [...data.data];
          this._PagingParams.totalRows = data.totalCount;
        });
      this.candidateService
        .RequestCheckIsApplyAndFavourite(dataJson.data.id, this.id)
        .subscribe((data: any) => {
          this.isActive = data.isActive;
          this.isLike = data.islike;
        });
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.SpinnerService.hide();
        }, 1000);
    });
  }
  onApply() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '');
    this.__dialog
      .open(ApplyJobPopupComponent, {
        width: '700px',
        autoFocus: false,
        data: {
          idJob: this._ITEM_DATA.idJob,
          idRecruitment: this._ITEM_DATA.idRecruitment,
          idUser: dataJson.data.id,
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
  onFavourite(idJob: any) {
    let favourite: VMCreateFavourite;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '');
    if (!this.isLike) {
      this.isLike = true;
      favourite = {
        IdUser: dataJson.data.id,
        idJob: idJob,
        isLike: this.isLike,
      };
      this.favouriteService
        .RequestCreateFavourite(favourite)
        .subscribe((data: any) => {
          this.getListData();
        });
    } else {
      this.isLike = false;
      favourite = {
        IdUser: dataJson.data.id,
        idJob: idJob,
        isLike: this.isLike,
      };
      this.favouriteService
        .RequestCreateFavourite(favourite)
        .subscribe((data: any) => {
          this.getListData();
        });
    }
  }
}
