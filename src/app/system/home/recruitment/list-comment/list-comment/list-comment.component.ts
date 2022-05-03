import { Component, OnInit } from '@angular/core';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListCommentService } from './list-comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {

  constructor(private listCommentService : ListCommentService) { }

  _PagingParams = new PagingParams();
  ngOnInit() {
  }
  columns = this.listCommentService.getColums();
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
