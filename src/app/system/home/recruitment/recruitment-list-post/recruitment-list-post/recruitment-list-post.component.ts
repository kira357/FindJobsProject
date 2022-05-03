import { PagingParams } from './../../../../../core/model/paging-params';
import { Component, OnInit } from '@angular/core';
import { RecruitmentListPostService } from './recruitment-list-post.service';

@Component({
  selector: 'app-recruitment-list-post',
  templateUrl: './recruitment-list-post.component.html',
  styleUrls: ['./recruitment-list-post.component.scss'],
})
export class RecruitmentListPostComponent implements OnInit {
  constructor(private recruitmentListPostService: RecruitmentListPostService) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this._PagingParams.pageSize = 10;
    this._PagingParams.totalRows = 10;
  }
  columns = this.recruitmentListPostService.getColums();
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
