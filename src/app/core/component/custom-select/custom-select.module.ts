import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PipeModule } from '../../pipe/pipe.module';

import { CustomSelectComponent } from './custom-select.component';

@NgModule({
  declarations: [CustomSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    PipeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    PipeModule,
    NgxMatSelectSearchModule,
  ],
  exports: [CustomSelectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomSelectModule {}
