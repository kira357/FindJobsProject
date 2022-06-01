import { CommentService } from './../../../../../core/model/comment/comment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/core/model/candidateJob/candidate.service';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { VMGetJobDto } from 'src/app/core/model/jobs/model/Jobs';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ApplyJobPopupComponent } from '../../quick-detail/popups/apply-job-popup.component';
import { UserComment } from 'src/app/core/model/comment/model/comment';

@Component({
  selector: 'app-detail-job-body',
  templateUrl: './detail-job-body.component.html',
  styleUrls: ['./detail-job-body.component.scss'],
})
export class DetailJobBodyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private jobsService: JobsService,
    private candidateService: CandidateService,
    private __dialog: MatDialog,
    private commentService : CommentService
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
  commentArray : UserComment[] = [];
  getData: any;
  sub: any;
  id: any;

  commentCreated = this.formBuilder.group({
    commentMsg: ['', Validators.required],
  });

  ngOnInit() {
    this.getListData();
  }
  isActive: boolean = false;
  getListData() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log('params', params);
      this.id = params.get('id');
      this.jobsService
        .RequestGetItemJob(this._PagingParams, this.id)
        .subscribe((data: any) => {
          console.log('data', data);
          this._ITEM_DATA = data.data[0];
        });
      this.candidateService
        .RequestCheckIsApply(dataJson.data.id, this.id)
        .subscribe((data: any) => {
          this.isActive = data.isActive;
        });
        this.commentService.RequestGetCommentUserOnJobs(this._PagingParams, this.id).subscribe((data: any) => {
          console.log('comment', data);
          this.commentArray = data.data;
        }
        )
    });
  }
  onApply() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.__dialog
      .open(ApplyJobPopupComponent, {
        width: '700px',
        autoFocus: false,
        data: {
          idJob: this._ITEM_DATA.idJob,
          idRecruitment: this._ITEM_DATA.idRecruitment,
          idUser: dataJson.data.id,
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
  addComment(item_data :any ){
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
  
  }
}
