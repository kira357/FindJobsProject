import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Company } from 'src/app/common/Company';
import { CompanyJobs } from 'src/app/common/CompanyJobs';
import { Jobs } from 'src/app/common/Jobs';
import { User } from 'src/app/common/User';
import { ApiService } from 'src/app/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import 'node_modules/quill-emoji/dist/quill-emoji.js';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);
import { MatFormFieldControl } from '@angular/material/form-field';
import { ReplaySubject } from 'rxjs';
import { UserService } from 'src/app/core/model/user/user.service';

@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.scss'],
})
export class CreateJobsComponent implements OnInit {
  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
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
  }
  Company: Company[] = [
    {
      id: '',
      descriptions: '',
      fromDay: '',
      toDay: '',
      name: '',
      type: '',
      address: '',
      dateWork: '',
      logo: '',
      imageSrc: '',
    },
  ];
  JobsObject: Jobs = {
    id: '',
    idEmployee: '',
    idCompany: '',
    name: '',
    nameCompany: '',
    tag: '',
    dateExpire: '',
    descriptions: '',
    imageSrc: '',
    active: false,
  };
  infoJobs: CompanyJobs[] = [
    {
      name: '',
      nameJobs: '',
      imageSrc: '',
      type: '',
      active: false,
      tag: '',
      dayLeft: '',
      idCompany: '',
      id: '',
      dateExpire: '',
      descriptions: '',
    },
  ];
  modules = {};
  defaultImageSrc = '/assets/image/default-image.png';
  infoRegister: any[] = [];
  listTagJobs: any[] = ['C#', 'Java', 'PHP', 'C++'];
  listMajorJobs: any[] = ['IT', 'Điện'];

  listExperienceJobs: any[] = [
    'Không yêu cầu kinh nghiệm',
    '1 năm kinh nghiệm',
    '2 năm kinh nghiệm',
    '3 năm kinh nghiệm',
    '4 năm kinh nghiệm',
    '5 năm kinh nghiệm',
  ];

  check: any;
  getDateExpire: any;
  experience :any
  dropdownSettings: IDropdownSettings = {};
  imageFile: { link: any; file: any; name: string } | undefined;

  onItemSelect(item: any) {
    console.log('123', item);
  }
  onSelectAll(items: any) {
    console.log('456', items);
  }
  handleChange = (evt: any) => {
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageFile = {
          link: e.target.result,
          file: evt.srcElement.files[0],
          name: evt.srcElement.files[0].name,
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imageFile = {
        link: this.defaultImageSrc,
        file: null,
        name: '',
      };
    }
  };

  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  descriptions: any;

  employeeCreated = this.formBuilder.group({
    name: ['', Validators.required],
    nameCompany: ['', Validators.required],
    tag: ['', Validators.required],
    imageFile: '',
    dateExpire: ['', Validators.required],
    address: ['', Validators.required],
    positon: ['', Validators.required],
    check: ['', Validators.required],
    amount: ['', Validators.required],
    experience: ['', Validators.required],
    workTime: ['', Validators.required],
    salaryMin: ['', Validators.required],
    salaryMax: ['', Validators.required],
    descriptions: ['', Validators.required],
  });

  editor = ClassicEditor;
  ngOnInit() {
    this.GetListPost();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  GetListPost = () => {
    this.displayedColumns = [
      'logo',
      'name',
      'address',
      'type',
      'dateWork',
      'active',
      'options',
    ];
    this.service.RequestShowListEmployee().subscribe((data: any) => {
      this.Company = data.dataCompany;
      console.log('dataAccount', this.Company);
      this.dataSource = new MatTableDataSource<Company>(this.Company);
      this.selection = new SelectionModel<Company>(true, []);
    });
  };

  newForm: any;
  datePipe: DatePipe = new DatePipe('en-US');
  currentDate = new Date();
  dateExpire: any;

  onSubmit = () => {
    this.newForm = this.employeeCreated.getRawValue();
    console.log('before', this.newForm);
    this.newForm = {
      ...this.newForm,
      dateExpire: this.datePipe.transform(this.newForm.dateExpire, 'yyyy-MM-dd'),
    }
    console.log('after', this.newForm);
    // let newDateExpire = new Date(this.dateExpire);
    // let newTag = this.newForm.tag.join(',');
    // let test = Math.floor(
    //   (Date.UTC(
    //     newDateExpire.getFullYear(),
    //     newDateExpire.getMonth(),
    //     newDateExpire.getDate()
    //   ) -
    //     Date.UTC(
    //       this.currentDate.getFullYear(),
    //       this.currentDate.getMonth(),
    //       this.currentDate.getDate()
    //     )) /
    //     (1000 * 60 * 60 * 24)
    // );
    // console.log('test', this.currentDate.toString());
    // if (this.JobsObject.id !== '00000000-0000-0000-0000-000000000000') {
    //   this.newForm = Object.assign(this.newForm, {
    //     descriptions: this.descriptions,
    //     daysLeft: test,
    //     active: false,
    //     idCompany: this.JobsObject.id,
    //   });
    //   this.newForm = {
    //     ...this.newForm,
    //     tag: newTag,
    //   };
    //   this.Form = JSON.stringify(this.newForm);
    //   console.log('newForm', this.newForm);

    //   this.service.RequestCreateJobs(this.newForm).subscribe((data: any) => {
    //     this.infoRegister = data;
    //     console.log(this.infoRegister);
    //     if (data.ok === 'Success') {
    //       console.log('check', this.infoRegister);
    //       this.matSnackBar.open('Create Employee success', 'Okay!', {
    //         duration: 5000,
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: ['snack-success'],
    //       });
    //     }
    //   });
    // }
  };

  newRow: any = {};
  arrayTrue: any[] = [];
  result: any;
  hidden: boolean = false;
  display: string = 'none';
  idRow: any;
  JobAfterSpiltTag: any;
  handleClick = (row: any) => {
    console.log(row);
    this.JobsObject = {
      id: row.id,
      idEmployee: row.idEmployee,
      idCompany: row.id,
      name: '',
      nameCompany: row.name,
      tag: '',
      descriptions: '',
      dateExpire: '',
      active: false,
      imageSrc: row.imageSrc,
    };
    this.imageFile = {
      file: row.name,
      link: row.imageSrc,
      name: row.name,
    };
    // if (row.id !== '00000000-0000-0000-0000-000000000000') {
    //   this.hidden = false;
    //   this.display = 'block';
    //   this.service
    //     .RequestShowListJobsByCompany(row.id)
    //     .subscribe((data: any) => {
    //       this.infoJobs = data;
    //       console.log('data', this.infoJobs);
    //       this.JobAfterSpiltTag = this.infoJobs.map((x) => {
    //         let y = x.tag.split(',').map((z) => {
    //           return { name: z };
    //         });
    //         return { ...x, tag: y };
    //       });
    //     });
    // }
  };

  onChange = (evt: any) => {
    console.log('descriptions', evt.html);
  };

  onClickDelete = (id: any) => {
    // this.service.RequestDeleteCompany(id).subscribe((data: any) => {
    //   this.result = data;
    //   console.log('result', this.result);
    //   if (data.ok === 'Success') {
    //     console.log('check', this.result);
    //     this.matSnackBar.open('Delete Employee success', 'Okay!', {
    //       duration: 5000,
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: ['snack-success'],
    //     });
    //     this.GetListPost();
    //   }
    // });
  };

  select = () => {
    console.log('123', this.check);
  };
  onReset() {}

  onClose() {}
}
