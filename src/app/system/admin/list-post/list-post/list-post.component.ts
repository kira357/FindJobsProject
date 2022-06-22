import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { ListJobsService } from '../../list-jobs/list-jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListJobsCreatePopupComponent } from 'src/app/system/home/recruitment/recruitment-list-jobs/popups/list-jobs-create-popup.component';
import { ListPostService } from '../list-post.service';
import { BlogService } from 'src/app/core/model/blogs/Blogs.service';
import { ListPostCreatePopupComponent } from 'src/app/system/home/recruitment/recruitment-list-post/popups/list-post-create-popup.component';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  constructor(
    private listPostService: ListPostService,
    private blogService: BlogService,
    private __dialog: MatDialog
  ) {}

  _PagingParams = new PagingParams();
  rowData: any;
  ngOnInit() {
    this.getListData();
  }
  columns = this.listPostService.getColums();
  _LIST_DATA: any[] = [];

  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '{}');
    this.blogService
      .RequestGetAllListPost(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  getListData() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '{}');
    this.blogService
    .RequestGetAllListPost(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
    this.rowData = evt;
  }

  onEdit($event: any): void {
    console.log('onEdit', $event);
    this.__dialog
      .open(ListPostCreatePopupComponent, {
        width: 'auto',
        autoFocus: false,
        data: {
          idBlog: $event.idBlog,
          idUser: $event.idUser,
          title : $event.title,
          image: $event.image,
          summary: $event.summary,
          idMajor: $event.idMajor,
          description: $event.description,
          status: $event.status,
          isActive: $event.isActive,
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
    this.blogService.RequestDeletePost($event).subscribe((data: any) => {
      this.getListData();
    });
  }

  async onCheck($event: any) {
    console.log('onCheck', this.rowData);
    this.rowData.isActive = $event;
    await this.blogService
      .RequestUpdateApprovedPost(this.rowData)
      .subscribe((data: any) => {
        console.log('data', data.ok);
        this.getListData();
      });
  }
}
