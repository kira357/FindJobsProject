
import { AbstractType, InjectionToken, Type } from '@angular/core';
import { Subject } from 'rxjs';
export class Combobox<S, T> {
  private _localService: S ;
  _args: any;
  constructor(
    public _type: Type<S> | AbstractType<S> | InjectionToken<S>,
    public valueField: keyof T,
    public textField: keyof T,
    private _data: T[],
    private fn?: keyof S,
    ...args: any
  ) {
    this._args = args;
    this.DATA = _data;
  }

  public DATA: T[];
  public count: number;
  GetServer(_service: S) {
    var _args = Object.assign({}, this._args);
    var fn_get = this.fn_get(_service, _args);
    if (fn_get) {
      fn_get.subscribe(i => {
        // this.SetData(i);
      });
    }
  }
  private fn_get(_service: S | any, _args: any) {
    var get = _service[this.fn];
    if (typeof get == 'function') {
      var fn_get = get.apply(get, _args) as Subject<T[]>;
      if (fn_get.subscribe()) {
        return fn_get;
      }
    }
  }
  Get(_service: S, ovewrite = false) {
    this._localService = _service;
    if (this.DATA && this.DATA.length && ovewrite == false) {
      return;
    }
    if (this._data && this._data.length) {
      this.DATA = this._data;
      this.count = this.DATA.length;
      return;
    }
    var fn_get = this.fn_get(_service, this._args);
    if (fn_get) {
      fn_get.subscribe(i => {

      });
    }
  }

  GetItem(value: T[keyof T]) {
    if (this.DATA) return this.DATA.find(i => i[this.valueField] == value);
    return null;
  }
  GetText(value: T[keyof T]) {
    var item = this.GetItem(value);
    if (item != null) {
      return item[this.textField];
    }
    return null;
  }

  Filter(textSearch: string) {
    if (textSearch) {
      if (this.DATA) {
        let finded = this.DATA.find(i => {
          let text = i[this.textField] || '';
          text = String(text);
          return text.indexOf(textSearch) != -1;
        });
        return !!finded;
      }
      return true;
    }
    return true;
  }

  Reload() {
    if (this._localService) this.Get(this._localService, true);
  }
}
