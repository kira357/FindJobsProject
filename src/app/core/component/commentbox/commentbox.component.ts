import { PagingParams } from 'src/app/core/model/paging-params';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../model/candidateJob/candidate.service';
import { CommentService } from '../../model/comment/comment.service';
import { JobsService } from '../../model/jobs/jobs.service';
import { UserComment } from '../../model/comment/model/comment';
import { ApiService } from 'src/app/services/api.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { VMGetCurrentUser } from '../../model/user/model/model';
import * as moment from 'moment';

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
    private commentService: CommentService,
    private apiAuthenService: ApiAuthenService
  ) {}
  _PagingParams = new PagingParams();
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
        this.commentArray.map((comment) => {
          comment.commentDate = moment(comment.commentDate).format(
            'DD/MM/YYYY'
          );
          comment['openReply'] = false;
          if (comment.replies.length > 0) {
            comment.replies.map((reply: any) => {
              reply.createOn = moment(comment.createOn).format('DD/MM/YYYY');
              reply['openChildReply'] = false;
            });
          }
        }),
          console.log(this.commentArray);
      });
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
        console.log('123', this.currentUser);
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
      this.commentCreated.reset();
    });
  }
  addReply(id: any) {
    const dataJson = JSON.parse(this.data || '');
    const comment = {
      ReplyMsg: this.commentCreated.value.commentMsg,
      IdUser: dataJson.data.id,
      IdComment: id,
      IdPosition: this.idPostion,
    };
    this.commentService.RequestReplyComment(comment).subscribe((data: any) => {
      this.getListData();
      this.commentCreated.reset();
    });
  }

  ReplyComment(id: any, idUser: any) {
    this.commentArray.map((comment) => {
      if (comment.id == id && comment.idUser == idUser) {
        comment['openReply'] = !comment['openReply'];
      } else {
        comment['openReply'] = false;
      }
      comment.replies.map((reply: any) => {
        if (reply.id == id && reply.idUser == idUser) {
          reply['openChildReply'] = !reply['openChildReply'];
        } else {
          reply['openChildReply'] = false;
        }
      });
    });
  }
}
