import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseControl } from '../../base/base-control';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomInputComponent,
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent
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
  @Input() matSuffix: string;
  @Input() iconName: string;

  @Output() iconClick: EventEmitter<any> = new EventEmitter<any>();

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private _injec: Injector) {
    super(_injec);
  }

  override notifyValueChange(): void {
    if (this.onChange) {
      if (this.type === 'number') this.onChange(this.number);
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

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl ,
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
