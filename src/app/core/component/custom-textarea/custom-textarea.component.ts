import { Component, forwardRef, Injector, Input, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    NG_VALUE_ACCESSOR
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatFormFieldControl } from "@angular/material/form-field";
import { BaseControl } from "../../base/base-control";

@Component({
    selector: "custom-textarea",
    templateUrl: "./custom-textarea.component.html",
    styleUrls: ["./custom-textarea.component.scss"],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: CustomTextareaComponent,
            multi: true,
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomTextareaComponent),
            multi: true,
        },
    ],
})
export class CustomTextareaComponent
    extends BaseControl
    implements OnInit, MatFormFieldControl<any>
{
    @Input() title: string;
    @Input() type: string = "text";
    @Input() override disabled: boolean = false;
    @Input() maxlength: number = 250;
    @Input() name: string;
    @Input() override placeholder: string;
    @Input() readonly: boolean = false;
    @Input() override required: boolean = false;
    @Input() rows: number = 1;
    @Input() requiredMsg: string = "Required.";
    @Input() fxFlex: string;
    @Input() classInput: string;
    @Input() errorMsg: string;

    confirmValidParentMatcher = new ConfirmValidParentMatcher();

    constructor(
        private _injec: Injector,
    ) {
        super(_injec);
    }

    ngOnInit(): void { }

    IsNullOrWhiteSpace = () => (this.value || "").toString().trim().length === 0;
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
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
            (control.touched || (form && form.submitted))
        );
    }
}
