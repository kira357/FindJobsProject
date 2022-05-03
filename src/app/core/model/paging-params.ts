export class PagingParams {
  currentPage: number;
  pageSize: number;
  totalRows: number;

  constructor() {
    this.currentPage = 0;
    this.pageSize = 20;
    this.totalRows = 0;
  }
}
