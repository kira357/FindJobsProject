import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BlogService } from 'src/app/core/model/blogs/Blogs.service';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';

@Component({
  selector: 'app-body-blog',
  templateUrl: './body-blog.component.html',
  styleUrls: ['./body-blog.component.scss'],
})
export class BodyBlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private SpinnerService: NgxSpinnerService,
    private apiAuthenService: ApiAuthenService
  ) {}
  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  Amount: any;
  data: any;
  dataJson: any;
  dataFilterByMajor: any[] = [];
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
  };
  ngOnInit() {
    this.getCurrentUser();
    this.getListData();
  }

  getListData() {

    this.blogService
      .RequestGetAllListPostActive(this._PagingParams)
      .subscribe((data: any) => {
        this._LIST_DATA = [...data.data];
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.SpinnerService.hide();
        }, 1000);
      });
  }
  getCurrentUser() {
    this.SpinnerService.show();
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.dataJson = JSON.parse(this.data || '');
      this.apiAuthenService
        .RequestGetCurrentUser(this.dataJson.data.id)
        .subscribe((data: any) => {
          this.currentUser = data[0];
          this.blogService
            .RequestGetBlogFilterByMajor(
              this._PagingParams,
              this.currentUser.idMajor
            )
            .subscribe((data: any) => {
              this.dataFilterByMajor = [...data.data];
              console.log(this.dataFilterByMajor);
            });
        });
    }
  }
}
