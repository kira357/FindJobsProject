import { RecruitmentService } from 'src/app/core/model/recruitmentJob/recruitment.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import 'node_modules/quill-emoji/dist/quill-emoji.js';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);
import { debounceTime, ReplaySubject, Subject } from 'rxjs';
import { PagingParams } from 'src/app/core/model/paging-params';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import * as moment from 'moment';
import { MajorService } from 'src/app/core/model/major/major.service';
import { VMGetRecruitment } from 'src/app/core/model/recruitmentJob/model/recruitment';

@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.scss'],
})
export class CreateJobsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private majorService: MajorService,
    private jobService: JobsService,
    private recruitmentService: RecruitmentService
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

  modules = {};
  defaultImageSrc = '/assets/image/default-image.png';

  listExperienceJobs: any[] = [
    { value: 0, name: 'Dưới 1 năm' },
    { value: 1, name: '1 năm' },
    { value: 2, name: '2 năm' },
    { value: 3, name: '3 năm' },
    { value: 4, name: '4 năm' },
    { value: 5, name: '5 năm' },
    { value: 6, name: 'Trên 5 năm' },
  ];

  comboxMajor: any[] = [];
  _PagingParams = new PagingParams();
  getDateExpire: any;
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
  descriptions: any;
  employeeCreated = this.formBuilder.group({
    name: ['', Validators.required],
    nameCompany: ['', Validators.required],
    imageFile: '',
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

  check: any;

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
  heightQuill = window.innerHeight - 420
  ngOnInit() {
    this.getComboxMajor();
    this.getCurrentRecruitment();
    console.log('heightQuill', this.heightQuill);
  }
  newForm: any;
  datePipe: DatePipe = new DatePipe('en-US');
  dateExpire: any;
  formData = new FormData();
  currentRecruitment: VMGetRecruitment;
  onSubmit = () => {
    this.newForm = this.employeeCreated.value;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '{}');
    this.newForm.dateExpire = moment(this.newForm.dateExpire).format(
      'YYYY-MM-DD'
    );

    console.log('before', this.newForm);

    this.formData.append('jobImage', this.currentRecruitment.logo);
    this.formData.append('companyOfJobs', this.currentRecruitment.nameCompany);
    this.formData.append('name', this.newForm.name);
    this.formData.append('dateExpire', this.newForm.dateExpire);
    this.formData.append('address', this.newForm.address);
    this.formData.append('position', this.newForm.position);
    this.formData.append('amount', this.newForm.amount);
    this.formData.append('experience', this.newForm.experience);
    this.formData.append('workTime', this.newForm.workTime);
    this.formData.append('salaryMin', this.newForm.salaryMin);
    this.formData.append('salaryMax', this.newForm.salaryMax);
    this.formData.append('jobDetail', this.newForm.jobDetail);
    this.formData.append('idMajor', this.newForm.idMajor);
    this.formData.append('IdRecruitment', dataJson.data.id);
    console.log('after', this.newForm);
    this.jobService.RequestCreateJob(this.formData).subscribe((data) => {
      console.log('data', data);
      this.employeeCreated.reset();
      this.formData.forEach((value, key) => {
        this.formData.delete(key);
      });
      this.newForm = {};
    });
  };

  onChange = (evt: any) => {
    console.log('descriptions', evt.html);
  };

  select = () => {
    console.log('123', this.check);
  };

  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }
  getCurrentRecruitment() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data || '{}');
    this.recruitmentService
      .RequestGetCurrentRecruitment(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentRecruitment = data;
      });
  }
  onReset() {
    this.employeeCreated.reset();
  }
}
