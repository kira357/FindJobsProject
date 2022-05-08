import { Component, OnInit } from '@angular/core';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListJobsService } from '../list-jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss']
})
export class ListJobsComponent implements OnInit {
  constructor(private listJobsService: ListJobsService) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
  }
  columns = this.listJobsService.getColums();
  _LIST_DATA = [
    {
      tradeTypeName: 'TradeType1',
      image : "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387__340.png",
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
      image : "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387__340.png",
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
      image : "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387__340.png",
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
  ];

  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    console.log('onPageChanged', this._PagingParams);
  }

  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }
}
