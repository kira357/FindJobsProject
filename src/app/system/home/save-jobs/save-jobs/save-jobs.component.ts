import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavouriteService } from 'src/app/core/model/favourite/favourite.service';
import { VMCreateFavourite } from 'src/app/core/model/favourite/model/favourite';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { ApiAuthenService } from 'src/app/services/api-authen.service';

@Component({
  selector: 'app-save-jobs',
  templateUrl: './save-jobs.component.html',
  styleUrls: ['./save-jobs.component.scss'],
})
export class SaveJobsComponent implements OnInit {
  _PagingParams = new PagingParams();
  _LIST_DATA: any[] = [];
  data : any ; 
  dataJson :any ;
  isActive: boolean = false;
  isLike: boolean = false;
  constructor(
    private jobsService: JobsService,
    private favouriteService : FavouriteService,
    private SpinnerService: NgxSpinnerService,
    private apiAuthenService: ApiAuthenService,
  ) {}

  currentUser: VMGetCurrentUser = {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    roleName: '',
    experience: '',
    nameMajor: '',
    idMajor: 0,
    urlAvatar: '',
    phoneNumber: '',
    address: '',
    email: '',
  };
  ngOnInit() {
    this.getCurrentUser();
  }
  onpageChange(evt: any) {
    this._PagingParams.currentPage = evt;
  }
  Amount: number;
  getListData(id:any) {
    this.SpinnerService.show();
    this.favouriteService
      .RequestGetAllListFavourite(this._PagingParams,id)
      .subscribe((data: any) => {
  
        data.data.dateExpire = moment().format('DD/MM/YYYY');
        this._LIST_DATA = [...data.data];
        console.log('getListData', this._LIST_DATA);
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
        setTimeout(() => {
          this.SpinnerService.hide();
        }, 1000);
      });
  }
  getCurrentUser() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.dataJson = JSON.parse(this.data || '');
        this.apiAuthenService
          .RequestGetCurrentUser(this.dataJson.data.id)
          .subscribe((data: any) => {
            this.currentUser = data[0];
           this.getListData(this.currentUser.id);
          });
    }
  }
  onFavourite(idJob: any) {
    let favourite;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '');
    favourite = {
      idJob: idJob,
      idUser: dataJson.data.id,
    };
    this.favouriteService.RequestRemoveFavourite(favourite).subscribe(data => {
      console.log(data);
      this.getListData(this.currentUser.id);
    }
    );
  }

  }
