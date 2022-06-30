import { MajorService } from 'src/app/core/model/major/major.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { PagingParams } from 'src/app/core/model/paging-params';

import { ListAccountService } from '../list-account.service';
import { VMGetUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { debounceTime, Subject } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { RolesService } from 'src/app/core/model/roles/Roles.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private listAccountService: ListAccountService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private majorService: MajorService,
    private rolesService: RolesService
  ) {
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

  _PagingParams = new PagingParams();
  isShowPassword: boolean;
  ngOnInit() {
    this.isShowPassword = false;
    this.getListData();
    this.getComboxMajor();
    this.getComboxRole();
  }
  columns = this.listAccountService.getColums();
  _LIST_DATA: any[] = [];
  _LIST_ITEM: any = {};
  employeeCreated = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    phonenumber: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    roleName: ['', Validators.required],
    idMajor: ['', Validators.required],
    password: ['', Validators.required],
    search: ['', Validators.required],
    isactive: false,
  });

  comboxMajor: any[] = [];
  comboxRole: any[] = [];
  gender: any[] = [
    { value: 0, name: 'Nữ' },
    { value: 1, name: 'Nam' },
  ];

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

  onChangeUserType(evt: any) {
    console.log(evt);
  }
  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    this.userService
      .RequestGetList(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData after pagin', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
  rowid: any;
  onRowClick(evt: any) {
    this._LIST_ITEM = evt;
    this.isShowPassword = true;
    this.rowid = evt.id;
  }
  select = (evt: any) => {
    console.log('123', evt);
  };

  getListData() {
    this.userService
      .RequestGetList(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
  getComboxMajor() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist major', data);
        this.comboxMajor = data.data;
      });
  }
  getComboxRole() {
    this.rolesService
      .RequestGetListRoles(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getlist role', data);
        this.comboxRole = data.data;
      });
  }

  onAdd() {
    if (this.rowid) {
      this.userService
        .RequestUpdateUser(this.employeeCreated.value, this._LIST_ITEM.id)
        .subscribe((data: any) => {
          this.getListData();
        });
    } else {
      this.userService
        .RequestCreateUser(this.employeeCreated.value)
        .subscribe((data: any) => {
          if (data) {
            this.getListData();
          }
        });
    }
  }
  onReset() {
    this._LIST_ITEM = {};
    this.isShowPassword = false;
  }
  onDelete() {
    if (this.rowid) {
      this.userService
        .RequestDeteleUser(this.employeeCreated.value, this._LIST_ITEM.id)
        .subscribe((data: any) => {
          if (data) {
            this.getListData();
          }
        });
    }
  }
  filterMyOptions(evt: any) {
    console.log('filterMyOptions', evt);
  }
}
