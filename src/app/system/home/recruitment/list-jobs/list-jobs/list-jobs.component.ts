import { ApiService } from 'src/app/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CompanyJobs } from 'src/app/common/CompanyJobs';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit {
  constructor(
    private service: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}
  check: any;
  infoRegister: any[] = [];
  dataAccount: any[] = [];
  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  tags: any[] = [];
  newData: any[] = [];

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

  ngOnInit() {
    this.GetListPost();
  }
  test: any;
  GetListPost = () => {
    this.displayedColumns = [
      'logo',
      'name',
      'type',
      'tag',
      'nameJobs',
      'dayLeft',
      'active',
      'options',
    ];
    this.service.RequestShowListJobs().subscribe((data: any) => {
      this.dataAccount = data;
      this.infoJobs = data;
      console.log('dataAccount', this.infoJobs);
      this.test = this.infoJobs.map((x) => {
        let y = x.tag.split(',').map((z) => {
          return { name: z };
        });
        return { ...x, tag: y };
      });
      console.log('tag', this.test);
      this.dataSource = new MatTableDataSource<CompanyJobs>(this.test);
      this.selection = new SelectionModel<CompanyJobs>(true, []);
    });
  };

  handleDeleteJob = async (id: any) => {
    console.log('id', id);
    await this.service.RequestDeleteJob(id).subscribe((data: any) => {
      this.GetListPost();
    });
  };
  onChangeActive = async (id: any, active: any) => {
    if (active.check === true) {
      await this.service
        .RequestChangeActive(id, active.checked)
        .subscribe((data: any) => {
          console.log('data', data.ok);
          this.GetListPost();
        });
    } else {
      await this.service
        .RequestChangeActive(id, active.checked)
        .subscribe((data: any) => {
          this.GetListPost();
        });
    }
  };
}
