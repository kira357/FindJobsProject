import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from 'src/app/core/model/blogs/Blogs.service';
import { VMGetBlogDto } from 'src/app/core/model/blogs/model/Blog';
import { CandidateService } from 'src/app/core/model/candidateJob/candidate.service';
import { CommentService } from 'src/app/core/model/comment/comment.service';
import { UserComment } from 'src/app/core/model/comment/model/comment';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { VMGetJobDto } from 'src/app/core/model/jobs/model/Jobs';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ApplyJobPopupComponent } from '../../client/quick-detail/popups/apply-job-popup.component';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss'],
})
export class DetailBlogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private blogService: BlogService,
    private candidateService: CandidateService,
    private __dialog: MatDialog,
    private commentService: CommentService,
    private SpinnerService: NgxSpinnerService
  ) {}

  data = localStorage.getItem('data');
  _PagingParams = new PagingParams();
  _ITEM_DATA: VMGetBlogDto = {
    idBlog: '',
    idUser: '',
    title: '',
    image: '',
    imageUser: '',
    nameUser: '',
    summary: '',
    idMajor: '',
    nameMajor: '',
    description: '',
    datePost: new Date(),
    status: '',
    view: 0,
    isActive: false,
    hotPost: false,
  };
  commentArray: UserComment[] = [];
  getData: any;
  sub: any;
  id: any;
  isComment: boolean = false;
  ngOnInit() {
    this.getListData();
    if (this.data != null) {
      this.isComment = true;
    }
  }
  isActive: boolean = false;
  getListData() {
    this.SpinnerService.show();
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log('params', params);
      this.id = params.get('id');
      this.blogService
        .RequestGetItemPost(this._PagingParams, this.id)
        .subscribe((data: any) => {
          console.log('data', data);
          this._ITEM_DATA = data.data[0];
          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.SpinnerService.hide();
          }, 1000);
        });
    });
    if (this.data !== null) {
      const dataJson = JSON.parse(this.data || '{}');
      const id = dataJson?.data.id;
      this.candidateService
        .RequestCheckIsApplyAndFavourite(id, this.id)
        .subscribe((data: any) => {
          this.isActive = data.isActive;
        });
    }
  }
}
