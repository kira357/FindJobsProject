import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "custom-checkbox",
  templateUrl: "./custom-checkbox.component.html",
  styleUrls: ["./custom-checkbox.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true,
    },
  ],
})
export class CustomCheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() title: string;
  @Input() name: string;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  checked: boolean = false;
  writeValue(checked: boolean) {
    this.checked = checked;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  disabled: boolean = false;
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
  }
}
