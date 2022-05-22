import { Major } from './../../../../core/model/major/model/Major';
import { ListMajorService } from '../list-major.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PagingParams } from 'src/app/core/model/paging-params';
import { MatDialog } from '@angular/material/dialog';
import { MajorCreatePopupComponent } from '../popups/major-create-popup.component';
import { MajorService } from 'src/app/core/model/major/major.service';

@Component({
  selector: 'app-create-major',
  templateUrl: './create-major.component.html',
  styleUrls: ['./create-major.component.scss'],
})
export class CreateMajorComponent implements OnInit {
  constructor(
    private listMajorService: ListMajorService,
    private formBuilder: FormBuilder,
    private __dialog: MatDialog,
    private majorService: MajorService
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this.getListData();
  }
  columns = this.listMajorService.getColums();
  _LIST_DATA: Major[] = [];

  public onAdd(): void {
    this.__dialog
      .open(MajorCreatePopupComponent, {
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
      .open(MajorCreatePopupComponent, {
        width: '350px',
        autoFocus: false,
        data: {
          idMajor: $event.idMajor,
          name: $event.name,
          description: $event.description,
        } as any,
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getListData();
        }
      });
  }
  onDelete($event: any) {
    console.log('onDelete', $event);
    this.majorService.RequestDeleteMajor($event).subscribe((data: any) => {
      this.getListData();
    });
  }
  onChangeUserType(evt: any) {
    console.log(evt);
  }
  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData after pagin', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }

  getListData() {
    this.majorService
      .RequestGetListMajor(this._PagingParams)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
}
