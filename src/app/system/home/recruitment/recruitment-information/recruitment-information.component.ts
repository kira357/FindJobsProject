import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { MajorService } from 'src/app/core/model/major/major.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { VMGetRecruitment } from 'src/app/core/model/recruitmentJob/model/recruitment';
import { RecruitmentService } from 'src/app/core/model/recruitmentJob/recruitment.service';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import Quill from 'quill';
import 'node_modules/quill-emoji/dist/quill-emoji.js';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);
@Component({
  selector: 'app-admin-page-login',
  templateUrl: './recruitment-information.component.html',
  styleUrls: ['./recruitment-information.component.scss'],
})
export class RecruitmentInformationComponent implements OnInit {
  modules = {};
  constructor(
    private formBuilder: FormBuilder,
    private majorService: MajorService,
    private apiAuthenService: ApiAuthenService,
    private userService: UserService,
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
  }
  defaultImageSrc = '/assets/image/default-image.png';

  updateRecruitment = this.formBuilder.group({
    nameCompany: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    typeCompany: ['', Validators.required],
    typeOfWork: ['', Validators.required],
    amount: ['', Validators.required],
    address: ['', Validators.required],
    summary:  ['', Validators.required],
    descriptions:  ['', Validators.required],
    website: '',
    fax: '',
    imageFile: '',
    search: '',
  });
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
  heightQuill = window.innerHeight - 420
  comboxMajor: any[] = [];

  typeOfWork: any[] = [
    { value: 1, name: 'Off site' },
    { value: 2, name: 'On site' },
    { value: 3, name: 'Full time' },
    { value: 4, name: 'Part time' },
  ]
  typeCompany: any[] = [
    { value: 1, name: 'Out source' },
    { value: 2, name: 'Product' },
    { value: 3, name: 'Service' },
    { value: 4, name: 'Other' },
  ]
  _PagingParams = new PagingParams();
  onSearch: Subject<string>;
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
  ngOnInit() {
    // this.getCurrentUser();
    this.getRecruitment();
  }

  data = localStorage.getItem('data');
  currentUser: VMGetCurrentUser;

  _DATA_COMPANY: VMGetRecruitment = {
    idRecruitment: '',
    nameCompany: '',
    email: '',
    typeCompany: 0,
    descriptions: '',
    summary: '',
    address: '',
    logo: '',
    urlLogo: '',
    typeOfWork: 0,
    amount: 0,
    website: '',
    fax: '',
  };
  _DATA_FORMAT :any ={}
  getRecruitment() {
    const dataJson = JSON.parse(this.data || '');
    this.recruitmentService
      .RequestGetCurrentRecruitment(dataJson.data.id)
      .subscribe((data: any) => {
        this._DATA_COMPANY = data;
        this._DATA_FORMAT = {...this._DATA_COMPANY, typeOfWork : this.typeOfWork.find(x => x.value == this._DATA_COMPANY.typeOfWork)?.name , typeCompany : this.typeCompany.find(x => x.value == this._DATA_COMPANY.typeCompany)?.name}
      });
  }


  formData = new FormData();
  onEdit() {
    this.formData.append('imageFile', this.files[0]);
    this.formData.append('nameCompany', this.updateRecruitment.value.nameCompany);
    this.formData.append('typeCompany', this.updateRecruitment.value.typeCompany);
    this.formData.append('typeOfWork', this.updateRecruitment.value.typeOfWork);
    this.formData.append('amount', this.updateRecruitment.value.amount);
    this.formData.append('address', this.updateRecruitment.value.address);
    this.formData.append('website', this.updateRecruitment.value.website);
    this.formData.append('summary', this.updateRecruitment.value.summary);
    this.formData.append('descriptions', this.updateRecruitment.value.descriptions);

    this.recruitmentService
      .RequestUpdateCurrentRecruitment(this.formData, this._DATA_COMPANY.idRecruitment)
      .subscribe((data: any) => {
        console.log('data', data);
        this.openEdit = false;
        this.updateRecruitment.reset();
        this.getRecruitment();
        //detele all key in formdata
        this.formData.forEach((value, key) => {
          this.formData.delete(key);
        });
        // this.getCurrentUser();
      });
  }

  openEdit: boolean = false;
  onOpenEdit() {
    if (this.openEdit) {
      this.openEdit = false;
    } else {
      this.openEdit = true;
    }
  }

}
