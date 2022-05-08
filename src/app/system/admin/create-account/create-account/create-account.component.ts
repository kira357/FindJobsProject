import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListAccountService } from '../list-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private listAccountService: ListAccountService,
    private formBuilder: FormBuilder
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {}
  columns = this.listAccountService.getColums();
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

  employeeCreated = this.formBuilder.group({
    name: ['', Validators.required],
    nameCompany: ['', Validators.required],
    tag: ['', Validators.required],
    imageFile: '',
    dateExpire: ['', Validators.required],
    address: ['', Validators.required],
    positon: ['', Validators.required],
    check: ['', Validators.required],
    amount: ['', Validators.required],
    experience: ['', Validators.required],
    workTime: ['', Validators.required],
    salaryMin: ['', Validators.required],
    salaryMax: ['', Validators.required],
    descriptions: ['', Validators.required],
  });

  listExperienceJobs: any[] = [
    'Không yêu cầu kinh nghiệm',
    '1 năm kinh nghiệm',
    '2 năm kinh nghiệm',
    '3 năm kinh nghiệm',
    '4 năm kinh nghiệm',
    '5 năm kinh nghiệm',
  ];
  experience: any;
  check: any;
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
