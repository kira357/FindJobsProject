import { VMUpdateJobDto } from '../../../../../core/model/jobs/model/Jobs';
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
import { BlogService } from 'src/app/core/model/blogs/Blogs.service';
Quill.register('modules/blotFormatter', BlotFormatter);
@Component({
  selector: 'app-list-post-create-popup',
  templateUrl: './list-post-create-popup.component.html',
  styleUrls: ['./list-post-create-popup.component.scss'],
})
export class ListPostCreatePopupComponent implements OnInit {
  headerTitle: string = '';
  modules = {};
  _PagingParams = new PagingParams();
  defaultImageSrc = '/assets/image/default-image.png';
  headerData: any = {
    idBlog: "",
    idUser: "",
    title : "",
    image: "",
    summary: "",
    idMajor: "",
    description: "",
    status: "",
    isActive: "",
  };
  employeeCreated = this.formBuilder.group({
    title: ['', Validators.required],
    imageFile: '',
    summary: ['', Validators.required],
    idMajor: ['', Validators.required],
    search: '',
    description: ['', Validators.required],
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<ListPostCreatePopupComponent>,
    private formBuilder: FormBuilder,
    private jobService: JobsService,
    private postService : BlogService,
    private majorService: MajorService,
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

  comboxMajor: any[] = [];

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Edit Jobs';
      this.getComboxMajor();
      this.headerData = {
        idBlog: this.data.idBlog,
        idUser: this.data.idUser,
        title : this.data.title,
        image: this.data.image,
        summary: this.data.summary,
        idMajor: this.data.idMajor,
        description: this.data.description,
        status: this.data.status,
        imageFile : '',
        isActive: this.data.isActive,
      };
    }
    console.log('data on popup', this.data);
  }

  newForm: any;
  dateExpire: any;
  formData = new FormData();

  onSubmit(): void {
    if (this.data) {
      this.formData.append('imageFile', this.files[0]);
      this.formData.append('title', this.headerData.title);
      this.formData.append('idBlog', this.headerData.idBlog);
      this.formData.append('idUser', this.headerData.idUser);
      this.formData.append('summary', this.headerData.summary);
      this.formData.append('idMajor', this.headerData.idMajor);
      this.formData.append('description', this.headerData.description);

      this.postService.RequestUpdatePost(this.formData).subscribe((res) => {
        // this.formData.forEach((value, key) => {
        //   this.formData.delete(key);
        // });
        console.log('update', res);
        this.dialogRef.close(true);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
  onReset() {
    this.employeeCreated.reset();
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
}
