import { BlogService } from 'src/app/core/model/blogs/Blogs.service';
import { PagingParams } from './../../../../../core/model/paging-params';
import { Component, OnInit } from '@angular/core';
import { RecruitmentListPostService } from './recruitment-list-post.service';
import { MatDialog } from '@angular/material/dialog';
import { ListPostCreatePopupComponent } from '../popups/list-post-create-popup.component';
import { VMUpdateBlogDto } from 'src/app/core/model/blogs/model/Blog';

@Component({
  selector: 'app-recruitment-list-post',
  templateUrl: './recruitment-list-post.component.html',
  styleUrls: ['./recruitment-list-post.component.scss'],
})
export class RecruitmentListPostComponent implements OnInit {
  constructor(
    private recruitmentListPostService: RecruitmentListPostService,
    private blogService: BlogService,
    private __dialog: MatDialog
  ) {}

  _PagingParams = new PagingParams();
  rowData: any;
  ngOnInit() {
    this.getListData();
  }
  columns = this.recruitmentListPostService.getColums();
  _LIST_DATA: any[] = [];

  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.blogService
      .RequestGetListPost(this._PagingParams, dataJson.data.id)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  getListData() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.blogService
      .RequestGetListPost(this._PagingParams, dataJson.data.id)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
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
}
