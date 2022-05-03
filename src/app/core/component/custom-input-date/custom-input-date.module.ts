import { SYSTEM_CONTAIN } from './../../base/system.contanst';
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateModule,
} from "@angular/material-moment-adapter";
import {
  MatNativeDateModule,
  MatOptionModule,
  MAT_DATE_FORMATS,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { PipeModule } from "../../pipe/pipe.module";
import { CustomInputDateComponent } from "./custom-input-date.component";

@NgModule({
  declarations: [CustomInputDateComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    PipeModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    PipeModule,
    MatSelectModule,
    MomentDateModule,
  ],
  exports: [CustomInputDateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
    { provide: MAT_DATE_FORMATS, useValue: SYSTEM_CONTAIN.FORMAT_DATE },
  ],
})
export class CustomInputDateModule {}
