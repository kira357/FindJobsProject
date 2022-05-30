import { CandidateService } from './../../../../../core/model/candidateJob/candidate.service';
import { Component, OnInit } from '@angular/core';
import { PagingParams } from 'src/app/core/model/paging-params';
import { ListCVService } from '../list-cv.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-list-cv',
  templateUrl: './list-cv.component.html',
  styleUrls: ['./list-cv.component.scss'],
})
export class ListCvComponent implements OnInit {
  constructor(
    private listCvService: ListCVService,
    private candidateService: CandidateService,
  ) {}

  _PagingParams = new PagingParams();
  ngOnInit() {
    this.getListData();
  }
  columns = this.listCvService.getColums();
  _LIST_DATA: any = [];

  _LIST_ITEM: {} = {};

  onPageChanged(params: PagingParams) {
    this._PagingParams = params;
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.candidateService
      .RequestGetListCandidate(this._PagingParams, dataJson.data.id)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }

  getListData() {
    const data = localStorage.getItem('data');
    const dataJson = JSON.parse(data);
    this.candidateService
      .RequestGetListCandidate(this._PagingParams, dataJson.data.id)
      .subscribe((data: any) => {
        console.log('getListData', data);
        this._LIST_DATA = data.data;
        this._PagingParams.totalRows = data.totalCount;
      });
  }
  onRowClick(evt: any) {
    console.log('onRowClick', evt);
  }
  onDowloadFile(evt: any) {
    this.candidateService.RequestDownloadFile(evt).subscribe((data: Blob) => {
      console.log('onDowloadFile', data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      saveAs(data, evt)  
    });
  }
  onDelete(evt: any) {}
}
