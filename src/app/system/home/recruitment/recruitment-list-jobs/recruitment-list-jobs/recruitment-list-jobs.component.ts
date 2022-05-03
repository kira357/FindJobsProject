import { RecruitmentListJobsService } from './recruitment-list-jobs.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PagingParams } from 'src/app/core/model/paging-params';

@Component({
  selector: 'app-recruitment-list-jobs',
  templateUrl: './recruitment-list-jobs.component.html',
  styleUrls: ['./recruitment-list-jobs.component.scss'],
})
export class RecruitmentListJobsComponent implements OnInit {
  constructor(private recruitmentListJobsService: RecruitmentListJobsService) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
  }
  columns = this.recruitmentListJobsService.getColums();
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
      activeYn: true,
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

  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    console.log('onPageChanged', this._PagingParams);
  }

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }
}
