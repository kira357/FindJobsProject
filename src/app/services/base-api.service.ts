
import { AbstractType, Inject, Injectable, InjectionToken, Injector, Type } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PagingParams } from '../core/model/paging-params';


@Injectable({
    providedIn: 'root'
})
export class BaseApiService<TService, GetModel , CreateModel = GetModel, UpdateModel = GetModel> {
    constructor(
        private __injector: Injector,
        @Inject('root')
        private __serviceType: Type<TService> | AbstractType<TService> | InjectionToken<TService>
    ) {
        this._service = this.__injector.get(this.__serviceType);
        this._toastrService = this.__injector.get(ToastrService);
    }

    _LIST_DATA: GetModel[] = [];
    _ITEM_DATA = {} as GetModel | CreateModel | UpdateModel;
    _ITEM_DATA_BK: GetModel | CreateModel | UpdateModel;
    _PagingParams: PagingParams = new PagingParams();

    _option : {[key : string] :any }= {
        getFn: 'getList',
        deleteFn: 'delete',
        createFn: 'create',
        updateFn: 'update'
    };

    _service: TService;
    _toastrService: ToastrService;

    private getFn(...args: any[]) {
        var getFn = this._service[this._option['getList']];
        if (getFn && typeof getFn == 'function') {
            var _subGet = getFn.apply(getFn, args);
            return _subGet;
        }
    }
    private createFn(...args: any[]) {
        var createFn = this._service[this._option['create']];
        args = args || [this._ITEM_DATA];
        if (createFn && typeof createFn == 'function') {
            var _subCreate = createFn.apply(createFn, args);
            return _subCreate;
        }
    }
    private updateFn(...args: any[]) {
        var updateFn = this._service[this._option['update']];
        args = args || [this._ITEM_DATA];
        if (updateFn && typeof updateFn == 'function') {
            var _subUpdate = updateFn.apply(updateFn, args);
            return _subUpdate;
        }
    }
    private deleteFn(id: any) {
        var deleteFn = this._service[this._option['detele']];
        if (deleteFn && typeof deleteFn == 'function') {
            var _subDelete = deleteFn(id) as Subject<void>;
            return _subDelete;
        }
    }
    GetParamPaging(args: any = {}) {
        args['skipCount'] = this._PagingParams.currentPage * this._PagingParams.pageSize;
        args['maxResultCount'] = this._PagingParams.pageSize;
        return args;
    }

    GetListData(args: any = {}) {
        args['skipCount'] = this._PagingParams.currentPage * this._PagingParams.pageSize;
        args['maxResultCount'] = this._PagingParams.pageSize;
        return this.getFn(args);
    }

    isNullOrEmpty(s :any) {
        return s == null || s === '';
    }

    isNullOrZero(s :any) {
        return s == null || s === '0' || s == 0;
    }

    private reloadData(args: any = {}) {
        this.GetListData(args).subscribe((rs : any) => {
            if (rs['items']) {
                this._LIST_DATA = rs.items;
                this._PagingParams.totalRows = rs.totalCount;
            } else {
                this._LIST_DATA = rs;
                this._PagingParams.totalRows = 0;
            }
        });
    }

    InitData(args: any = {}) {
        this.reloadData(args);
    }

    SearchData() {
        this.GetListData(this._ITEM_DATA).subscribe((rs : any) => {
            if (rs['items']) {
                this._LIST_DATA = rs.items;
                this._PagingParams.totalRows = rs.totalCount;
            } else {
                this._LIST_DATA = rs;
                this._PagingParams.totalRows = 0;
            }
        });
    }



    SaveData() {
        if (Object.keys(this._ITEM_DATA).length === 0) return;

        const id = (this._ITEM_DATA as GetModel).id;
        if (this.isNullOrEmpty(id) || this.isNullOrZero(id) || id === '00000000-0000-0000-0000-000000000000') {
            this.createFn(this._ITEM_DATA as CreateModel).subscribe(c => {
                this.reloadData();
            });
        } else {
            this.updateFn((this._ITEM_DATA as GetModel).id, this._ITEM_DATA as UpdateModel).subscribe(res => this.reloadData());
        }
    }

    DeleteData() {
        this.deleteFn((this._ITEM_DATA as GetModel).id).subscribe(res => {
            this.reloadData();
        });
    }

    CloseCurrentTab() {
        this._navTabs.closeCurrentTab();
    }

   

    // show message
    showSuccess(msg?: string) {
        this._toastrService.success(this._trans.Translate(`WebUi::${msg ? msg : 'SUCCESS'}`));
    }

    showError(msg?: string) {
        this._toastrService.error(this._trans.Translate(`WebUi::${msg ? msg : 'ERROR'}`));
    }

    showWarning(msg?: string) {
        this._toastrService.warning(this._trans.Translate(`WebUi::${msg ? msg : 'WARNING'}`));
    }
}
