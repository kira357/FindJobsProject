import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BlogService } from 'src/app/core/model/blogs/Blogs.service';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';

@Component({
  selector: 'app-body-blog',
  templateUrl: './body-blog.component.html',
  styleUrls: ['./body-blog.component.scss'],
})
export class BodyBlogComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  _PagingParams = new PagingParams();
  _LIST_DATA: any = [];
  Amount: any;
  ngOnInit() { this.getListData()}

  getListData() {
    this.blogService
      .RequestGetAllListPostActive(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = [...data.data];
        this.Amount = data.totalCount;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
}
