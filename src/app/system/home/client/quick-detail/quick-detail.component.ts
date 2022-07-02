import { VMCreateFavourite } from './../../../../core/model/favourite/model/favourite';
import { FavouriteService } from './../../../../core/model/favourite/favourite.service';
import { CandidateService } from './../../../../core/model/candidateJob/candidate.service';
import { ApplyJobPopupComponent } from './popups/apply-job-popup.component';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
    private favouriteService: FavouriteService,
    private candidateService: CandidateService,
    private __dialog: MatDialog
  ) {}

  _PagingParams = new PagingParams();
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

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log('params', params);
      this.id = params.get('id');
      this.jobsService
        .RequestGetItemJob(this._PagingParams, this.id)
        .subscribe((data: any) => {
          this._ITEM_DATA = data.data[0];
        });
      if(data !== null || data !== undefined){
        const dataJson = JSON.parse(data);
        const id = dataJson?.data.id;
        this.candidateService
          .RequestCheckIsApplyAndFavourite(id, this.id)
          .subscribe((data: any) => {
            this.isActive = data.isActive;
            this.isLike = data.islike;
          });
      }
    });
  }
  onApply() {
    const data = localStorage.getItem('data');
    console.log('data', data);
    if(data !== null || data !== undefined){
      const dataJson = JSON.parse(data || '');
      const id = dataJson?.data.id;
      this.__dialog
        .open(ApplyJobPopupComponent, {
          width: '700px',
          autoFocus: false,
          data: {
            idJob: this._ITEM_DATA.idJob,
            idRecruitment: this._ITEM_DATA.idRecruitment,
            idUser: id,
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

  onFavourite(idJob: any) {
    let favourite : VMCreateFavourite;
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
