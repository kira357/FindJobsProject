import { Component, OnInit } from '@angular/core';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListCVService } from '../list-cv.service';

@Component({
  selector: 'app-list-cv',
  templateUrl: './list-cv.component.html',
  styleUrls: ['./list-cv.component.scss']
})
export class ListCvComponent implements OnInit {

  constructor(private listCvService: ListCVService) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this._PagingParams.pageSize = 10;
    this._PagingParams.totalRows = 10;
  }
  columns = this.listCvService.getColums();
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
  ];

  onPageChanged(params: PagingParams) {}

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }

}
