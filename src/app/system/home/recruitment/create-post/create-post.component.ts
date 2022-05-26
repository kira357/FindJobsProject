import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { debounceTime, Subject } from 'rxjs';
import { JobsService } from 'src/app/core/model/jobs/jobs.service';
import { MajorService } from 'src/app/core/model/major/major.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import Quill from 'quill';
import 'node_modules/quill-emoji/dist/quill-emoji.js';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  defaultImageSrc = '/assets/image/default-image.png';
  _PagingParams = new PagingParams();
  imageFile: { link: any; file: any; name: string } | undefined;
  files: any[] = [];
  modules: any = {};
  comboxMajor: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private majorService: MajorService,
    private jobService: JobsService
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

  employeeCreated = this.formBuilder.group({
    title: ['', Validators.required],
    imageFile: '',
    summary: ['', Validators.required],
    idMajor: ['', Validators.required],
    search: '',
    description: ['', Validators.required],
  });
  ngOnInit() {}

  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }
  newForm: any;
  currentDate = new Date();
  dateExpire: any;
  formData = new FormData();
  onSubmit = () => {
    this.newForm = this.employeeCreated.value;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.newForm.dateExpire = moment(this.newForm.dateExpire).format(
      'YYYY-MM-DD'
    );

    console.log('before', this.newForm);

    this.formData.append('title', this.newForm.title);
    this.formData.append('idMajor', this.newForm.idMajor);
    this.formData.append('imageFile', this.files[0], this.files[0].name);
    this.formData.append('summary', this.newForm.summary);
    this.formData.append('description', this.newForm.description);
    this.formData.append('Id', dataJson.data.id);
    this.jobService.RequestCreateJob(this.formData).subscribe((data) => {
      console.log('data', data);
      this.newForm = {};
    });
  };
  onReset() {}
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
}
