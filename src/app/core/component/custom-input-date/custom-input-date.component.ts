import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  ErrorStateMatcher,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as moment from 'moment';
import { BaseControl } from '../../base/base-control';
import { SYSTEM_CONTAIN } from '../../base/system.contanst';

declare let window: any;
@Component({
  selector: 'custom-input-date',
  templateUrl: './custom-input-date.component.html',
  styleUrls: ['./custom-input-date.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomInputDateComponent,
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputDateComponent),
      multi: true,
    },
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: SYSTEM_CONTAIN.MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class CustomInputDateComponent
  extends BaseControl
  implements OnInit, MatFormFieldControl<any>
{
  @Input() title: string;
  @Input() name: string;
  @Input() override required: boolean = false;
  @Input() override disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() type: string = 'text';
  @Input() requiredMsg: string = 'Required.';
  @Input() maxlength: number = 250;
  @Input() pattern: string;
  @Input() override placeholder: string;
  @Input() selectOnFocus: boolean = false;
  @Input() fxFlex: string;
  @Input() classInput: string;
  @Input() errorMsg: string;
  @Input() autocomplete: string;
  @Input() getDateString: boolean = false;
  @Input() appearance: any;
  @Input() min: Date;
  @Input() max: Date;

  appConfig = window.appConfig;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private _injec: Injector) {
    super(_injec);
  }

  override notifyValueChange(): void {
    if (this.onChange) {
      if (this.getDateString && this.value)
        this.onChange(moment(this.value).format(SYSTEM_CONTAIN.FORMAT_DATE));
      else this.onChange(this.value);
    }
  }
  ngOnInit(): void {}

  IsNullOrWhiteSpace = () => (this.value || '').toString().trim().length === 0;
  get number() {
    if (this.value) {
      let value: string = this.value.toString();
      value = value.replace(/,/g, '');
      return parseFloat(value);
    }
  }
}
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    if (control.touched && !control.value) {
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
