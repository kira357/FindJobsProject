import { ListRoleService } from './../list-role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PagingParams } from 'src/app/core/model/paging-params';
import { MatDialog } from '@angular/material/dialog';
import { RoleCreatePopupComponent } from '../popups/role-create-popup.component';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
  constructor(
    private listRoleService: ListRoleService,
    private formBuilder: FormBuilder,
    private __dialog: MatDialog
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {}
  columns = this.listRoleService.getColums();
  _LIST_DATA = [
    {
      tradeTypeName: 'TradeType1',
      customerCode: 'CustomerCode1',
      supplierName: 'FullName1',
      supplierShortName: 'ShortName1',
      ifCode: 'Code1',
      customerTypeName: 'CustomerType1',
      CountryTypeName: 'Country1',
      sysUserYn: true,
      activeYn: true,
      LasterETLDate: '2020-01-01',
      description: 'Description1',
    },
    {
      tradeTypeName: 'TradeType2',
      customerCode: 'CustomerCode2',
      supplierName: 'FullName2',
      supplierShortName: 'ShortName2',
      ifCode: 'Code2',
      customerTypeName: 'CustomerType2',
      CountryTypeName: 'Country2',
      sysUserYn: true,
      activeYn: false,
      LasterETLDate: '2020-01-01',
      description: 'Description2',
    },
    {
      tradeTypeName: 'TradeType3',
      customerCode: 'CustomerCode3',
      supplierName: 'FullName3',
      supplierShortName: 'ShortName3',
      ifCode: 'Code3',
      customerTypeName: 'CustomerType3',
      CountryTypeName: 'Country3',
      sysUserYn: true,
      activeYn: true,
      LasterETLDate: '2020-01-01',
      description: 'Description3',
    },
    {
      tradeTypeName: 'TradeType4',
      customerCode: 'CustomerCode4',
      supplierName: 'FullName4',
      supplierShortName: 'ShortName4',
      ifCode: 'Code4',
      customerTypeName: 'CustomerType4',
      CountryTypeName: 'Country4',
      sysUserYn: true,
      activeYn: true,
      LasterETLDate: '2020-01-01',
      description: 'Description4',
    },
    {
      tradeTypeName: 'TradeType4',
      customerCode: 'CustomerCode4',
      supplierName: 'FullName4',
      supplierShortName: 'ShortName4',
      ifCode: 'Code4',
      customerTypeName: 'CustomerType4',
      CountryTypeName: 'Country4',
      sysUserYn: true,
      activeYn: true,
      LasterETLDate: '2020-01-01',
      description: 'Description4',
    },
    {
      tradeTypeName: 'TradeType4',
      customerCode: 'CustomerCode4',
      supplierName: 'FullName4',
      supplierShortName: 'ShortName4',
      ifCode: 'Code4',
      customerTypeName: 'CustomerType4',
      CountryTypeName: 'Country4',
      sysUserYn: true,
      activeYn: true,
      LasterETLDate: '2020-01-01',
      description: 'Description4',
    },
    {
      tradeTypeName: 'TradeType4',
      customerCode: 'CustomerCode4',
      supplierName: 'FullName4',
      supplierShortName: 'ShortName4',
      ifCode: 'Code4',
      customerTypeName: 'CustomerType4',
      CountryTypeName: 'Country4',
      sysUserYn: true,
      activeYn: true,
      LasterETLDate: '2020-01-01',
      description: 'Description4',
    },
  ];

 
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
        }
      });
  }
test : any
  public onEdit($event: any): void {
    this.test = $event;
    console.log('onEdit', this.test);
    this.__dialog
      .open(RoleCreatePopupComponent, {
        width: '350px',
        autoFocus: false,
        data: {
          supplierName: $event.supplierName,
          customerTypeName: $event.customerTypeName,
          CountryTypeName: $event.CountryTypeName,
          activeYn : $event.activeYn,
          description: $event.description,
        } as any,
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          console.log('save data successfully', data);
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
    console.log('onPageChanged', this._PagingParams);
  }

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }
  select = () => {
    console.log('123', this.check);
  };
}
