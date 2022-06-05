import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/model/comment/comment.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListCommentService } from './list-comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss'],
})
export class ListCommentComponent implements OnInit {
  constructor(
    private listCommentService: ListCommentService,
    private commentService: CommentService
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this.getListData();
  }
  columns = this.listCommentService.getColums();
  _LIST_DATA: any[] = [];
  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    this.commentService
      .RequestGetAllListComment(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
  getListData() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.commentService
      .RequestGetAllListComment(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }
}
