import { CandidateService } from './../../../../../core/model/candidateJob/candidate.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MajorService } from 'src/app/core/model/major/major.service';
import {
  MajorCreateDto,
  UpdateMajorDto,
} from 'src/app/core/model/major/model/Major';
import * as moment from 'moment';

@Component({
  selector: 'app-apply-job-popup',
  templateUrl: './apply-job-popup.component.html',
  styleUrls: ['./apply-job-popup.component.scss'],
})
export class ApplyJobPopupComponent implements OnInit {
  headerTitle: string = '';
  headerData: any = {
    idJob: '',
    idRecruitment: '',
    idUser: '',
    name: '',
    introduction: '',
  };
  employeeCreated = this.formBuilder.group({
    idJob: '',
    name: ['', Validators.required],
    introduction: ['', Validators.required],
    imageFile: ['', Validators.required],
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<ApplyJobPopupComponent>,
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Apply job';
      this.headerData = {
        idJob: this.data.idJob,
        idRecruitment: this.data.idRecruitment,
        idUser: this.data.idUser,
        name: this.data.name,
      };
    }
    console.log('data on popup', this.data);
  }
  formData = new FormData();
  onSubmit(): void {
    if (this.data) {
      const dateApply = moment().format('YYYY-MM-DD');
      this.formData.append('idJob', this.headerData.idJob),
        this.formData.append('idRecruitment', this.headerData.idRecruitment),
        this.formData.append('idCandicate', this.headerData.idUser),
        this.formData.append('name', this.headerData.name),
        this.formData.append('introduction', this.headerData.introduction),
        this.formData.append('dateApply' , dateApply),
        this.formData.append('fileApply', this.file),
        this.candidateService
          .RequestApplyJob(this.formData)
          .subscribe((res) => {
            console.log('update', res);
            this.dialogRef.close(true);
          });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
  file: any;
  filename: string;
  onFileSelected(evt: any) {
    this.file = evt.target.files[0];
    this.filename = this.file.name;
  }
}
