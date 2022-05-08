
import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseControl } from 'src/app/core/base/base-control';
import { Combobox } from '../../base/combobox';
import { ServiceBase } from '../../base/service-interface';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomSelectComponent,
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent
  extends BaseControl
  implements OnInit, MatFormFieldControl<any>
{
  @Input() allValue: boolean;
  @Input() allValueText: string;
  @Input() override disabled: boolean;
  @Input() disabledOptions: any;
  @Input() data: any[];
  @Input() config: Combobox<ServiceBase, any>;
  @Input() override required: boolean = false;
  @Input() datatype: DataType = DataType.LOCAL;
  @Input() name: string;
  @Input() multiple: boolean = false;
  @Input() clear: boolean = false;
  @Input() clearText: string;
  @Input() title: string;
  @Input() requiredMsg: string = 'Required.';
  @Input() errorMsg: string;
  @Output('selectAllEvent') selectAllMessage = new EventEmitter();
  @Output('selectPerItemEvent') selectPerItemMessage = new EventEmitter();
  @ViewChild('allSelected') allSelected: MatOption;
  _service: ServiceBase;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private _injec: Injector) {
    super(_injec);
    if (this.datatype == DataType.SERVER) {
      this.onSearch = new Subject();
      this.onSearch.pipe(debounceTime(400)).subscribe((str) => {
        if (this.config._type) {
          this._service = this._injec.get(this.config._type);
          this.config.GetServer(this._service);
        }
      });
    }
  }

  checkedUncheckedSelectAll() {
    if (this.allValue === true) {
      if (this.allSelected.selected === true) {
        let event = 'selectAll';
        this.selectAllMessage.emit(event);
      } else {
        let event = 'unSelectAll';
        this.selectAllMessage.emit(event);
      }
    }
  }

  checkedUncheckedPerItem(event: any) {
    // if (this.allValue === true) {
    if (event) {
      this.selectPerItemMessage.emit(event);
    }
    // }
  }

  private _search: string;
  set search(value: string) {
    if (this._search != value) {
      this._search = value;
      if (this.onSearch) this.onSearch.next(value);
    }
  }
  get search() {
    return this._search;
  }
  onSearch: Subject<string>;
  get DATA ():any[] {
    return this.data || this.config.DATA;
  }
  get count() {
    return this.config.count;
  }
  ngOnInit(): void {
    if (this.config._type) {
      this._service = this._injec.get(this.config._type);
      this.config.Get(this._service);
    }
  }

  get text() {
    return this.config.textField as string;
  }
}
export enum DataType {
  LOCAL,
  SERVER,
}
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    if (control?.touched && !control.value) {
      control.markAsUntouched();
      return false;
    }
    return !!(
      control &&
      control.invalid &&
      // (control.touched || (form && form.submitted))
      control.touched
    );
  }
}
