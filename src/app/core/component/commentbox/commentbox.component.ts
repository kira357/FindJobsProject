import { PagingParams } from 'src/app/core/model/paging-params';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../model/candidateJob/candidate.service';
import { CommentService } from '../../model/comment/comment.service';
import { JobsService } from '../../model/jobs/jobs.service';
import { UserComment } from '../../model/comment/model/comment';

@Component({
  selector: 'custom-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.scss'],
})
export class CommentboxComponent implements OnInit {
  @Input() commentArray: any[];
  @Input() idPostion: any;
  @Input() _ITEM_DATA: any;
  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}
  _PagingParams = new PagingParams();
  getData: any;
  sub: any;
  id: any;
  data = localStorage.getItem('data');
  commentCreated = this.formBuilder.group({
    commentMsg: ['', Validators.required],
  });
  ngOnInit() {
    this.getListData();
  }
  getListData() {
    const dataJson = JSON.parse(this.data || '');
    this.commentService
      .RequestGetCommentUserOnJobs(this._PagingParams, this.idPostion)
      .subscribe((data: any) => {
        this.commentArray = data.data;
        this.commentArray.map((comment) => comment['openReply'] = false),
        console.log(this.commentArray);
      });
  }
  addComment() {
    const dataJson = JSON.parse(this.data || '');
    const comment = {
      CommentMsg: this.commentCreated.value.commentMsg,
      IdUser: dataJson.data.id,
      IdPosition: this.idPostion,
    };
    this.commentService.RequestCreateComment(comment).subscribe((data: any) => {
      this.getListData();
    });
  }

  ReplyComment(id: any) {
    this.commentArray.map((comment) => {
      if (comment.id == id) {
        comment['openReply'] = !comment['openReply'];
      } else {
        comment['openReply'] = false;
      }
    });
  }
  CancelComment() {}
}
