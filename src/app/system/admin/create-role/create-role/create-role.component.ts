import { ListRoleService } from './../list-role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PagingParams } from 'src/app/core/model/paging-params';
import { MatDialog } from '@angular/material/dialog';
import { RoleCreatePopupComponent } from '../popups/role-create-popup.component';
import { RolesService } from 'src/app/core/model/roles/Roles.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
  constructor(
    private listRoleService: ListRoleService,
    private formBuilder: FormBuilder,
    private __dialog: MatDialog,
    private rolesService: RolesService
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this.getListData();
  }
  columns = this.listRoleService.getColums();
  _LIST_DATA : any []= [];
  _LIST_ITEM: any = {};
  experience: any;
  check: any;

  public onAdd(): void {
    this.__dialog
      .open(RoleCreatePopupComponent, {
        width: '350px',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          console.log('save data successfully', data);
          this.getListData();
        }
      });
  }
  test: any;
  public onEdit($event: any): void {
    this.test = $event;
    console.log('onEdit', this.test);
    this.__dialog
      .open(RoleCreatePopupComponent, {
        width: '350px',
        autoFocus: false,
        data: {
          id: $event.id,
          name: $event.name,
          description: $event.description,
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
  onDelete($event: any) {
    console.log('onDelete', $event);
  }
  onChangeUserType(evt: any) {
    console.log(evt);
  }
  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    this.rolesService
      .RequestGetListRoles(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData after pagin', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
  onRowClick(evt: any) {
    console.log('onRowClick', evt);
    this._LIST_ITEM = evt;
  }

  getListData() {
    this.rolesService
      .RequestGetListRoles(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListRole', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
}
