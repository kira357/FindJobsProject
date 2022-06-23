import { VMUpdateJobDto } from './../../../../../core/model/jobs/model/Jobs';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject, debounceTime } from 'rxjs';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import 'node_modules/quill-emoji/dist/quill-emoji.js';
import BlotFormatter from 'quill-blot-formatter';
import Quill from 'quill';
import { MajorService } from 'src/app/core/model/major/major.service';
import { VMGetRecruitment } from 'src/app/core/model/recruitmentJob/model/recruitment';
import { RecruitmentService } from 'src/app/core/model/recruitmentJob/recruitment.service';
Quill.register('modules/blotFormatter', BlotFormatter);
@Component({
  selector: 'app-list-jobs-create-popup',
  templateUrl: './list-jobs-create-popup.component.html',
  styleUrls: ['./list-jobs-create-popup.component.scss'],
})
export class ListJobsCreatePopupComponent implements OnInit {
  headerTitle: string = '';
  modules = {};
  _PagingParams = new PagingParams();
  defaultImageSrc = '/assets/image/default-image.png';
  headerData: any = {
    address: '',
    amount: '',
    dateExpire: '',
    experience: '',
    idJob: '',
    idRecruitment: '',
    isActive: '',
    jobDetail: '',
    idMajor: '',
    name: '',
    position: '',
    recruitmentName: '',
    salaryMax: '',
    salaryMin: '',
    workTime: '',
  };
  employeeCreated = this.formBuilder.group({
    name: ['', Validators.required],
    dateExpire: ['', Validators.required],
    address: ['', Validators.required],
    position: ['', Validators.required],
    amount: ['', Validators.required],
    experience: ['', Validators.required],
    workTime: ['', Validators.required],
    salaryMin: ['', Validators.required],
    salaryMax: ['', Validators.required],
    jobDetail: ['', Validators.required],
    idMajor: ['', Validators.required],
    search: '',
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<ListJobsCreatePopupComponent>,
    private formBuilder: FormBuilder,
    private jobService: JobsService,
    private majorService: MajorService,
    private recruitmentService: RecruitmentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      blotFormatter: {
        // empty object for default behaviour.
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'], // link and image, video
          ['emoji'],
        ],
        handlers: { emoji: function () {} },
      },
    };
    this.onSearch = new Subject();
    this.onSearch.pipe(debounceTime(100)).subscribe((str) => {
      console.log('onSearch', str);
      let comboxfilter = this.comboxMajor.filter(
        (x) => x.name.indexOf(str) > -1
      );
      console.log('comboxfilter', comboxfilter);
      str ? (this.comboxMajor = comboxfilter) : this.getComboxMajor();
    });
  }

  listExperienceJobs: any[] = [
    {value : 0 , name : 'Dưới 1 năm'},
    {value : 1 , name : '1 năm'},
    {value : 2 , name : '2 năm'},
    {value : 3 , name : '3 năm'},
    {value : 4 , name : '4 năm'},
    {value : 5 , name : '5 năm'},
    {value : 6 , name : 'Trên 5 năm'},
  ];
  comboxMajor: any[] = [];

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Edit Jobs';
      this.getComboxMajor();
      this.headerData = {
        address: this.data.address,
        amount: this.data.amount,
        dateExpire: this.data.dateExpire,
        experience: this.data.experience,
        idJob: this.data.idJob,
        idRecruitment: this.data.idRecruitment,
        isActive: this.data.isActive,
        jobDetail: this.data.jobDetail,
        idMajor: this.data.idMajor,
        name: this.data.name,
        position: this.data.position,
        recruitmentName: this.data.recruitmentName,
        salaryMax: this.data.salaryMax,
        salaryMin: this.data.salaryMin,
        workTime: this.data.workTime,
      };
      this.getCurrentRecruitment();
    }
    console.log('data on popup', this.data);
  }

  newForm: any;
  dateExpire: any;
  formData = new FormData();
 
  onSubmit(): void {
    if (this.data) {
      this.formData.append('name', this.headerData.name);
      this.formData.append('dateExpire', this.headerData.dateExpire);
      this.formData.append('address', this.headerData.address);
      this.formData.append('position', this.headerData.position);
      this.formData.append('amount', this.headerData.amount);
      this.formData.append('experience', this.headerData.experience);
      this.formData.append('workTime', this.headerData.workTime);
      this.formData.append('salaryMin', this.headerData.salaryMin);
      this.formData.append('salaryMax', this.headerData.salaryMax);
      this.formData.append('jobDetail', this.headerData.jobDetail);
      this.formData.append('idMajor', this.headerData.idMajor);
      this.formData.append('idJob', this.headerData.idJob);
      this.formData.append('idRecruitment', this.headerData.idRecruitment);
      this.jobService.RequestUpdateJob(this.formData).subscribe((res) => {
        console.log('update', res);
        this.employeeCreated.reset();
      this.formData.forEach((value, key) => {
        this.formData.delete(key);
      });
        this.dialogRef.close(true);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  imageFile: { link: any; file: any; name: string } | undefined;
  files: any[] = [];
  handleChange = (evt: any) => {
    if (evt.target.files && evt.target.files[0]) {
      this.files = evt.target.files;
      let file1 = <File>evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file1);
      reader.onload = (e) => {
        this.imageFile = {
          link: reader.result,
          file: this.files,
          name: evt.srcElement.files[0].name,
        };
        console.log('link: ', this.imageFile.file);
      };
    } else {
      this.imageFile = {
        link: this.defaultImageSrc,
        file: null,
        name: '',
      };
    }
  };

  Form: any;
  private _search: string;
  set search(value: string) {
    if (this._search != value) {
      this._search = value;
      if (this.onSearch) {
        this.onSearch.next(value);
      }
    }
  }
  get search() {
    return this._search;
  }
  onSearch: Subject<string>;

  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }
  currentRecruitment: VMGetRecruitment;
  getCurrentRecruitment() {
    this.recruitmentService
      .RequestGetCurrentRecruitment(this.data.idRecruitment)
      .subscribe((data: any) => {
        this.currentRecruitment = data;
      });
  }
}
