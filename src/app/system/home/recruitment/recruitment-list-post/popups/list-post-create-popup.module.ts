import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

import { CustomCheckboxModule } from 'src/app/core/component/custom-checkbox/custom-checkbox.module';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { CustomSelectModule } from 'src/app/core/component/custom-select/custom-select.module';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { QuillModule } from 'ngx-quill';
import { ListPostCreatePopupRoutingModule } from './list-post-create-popup-routing.module';
import { ListPostCreatePopupComponent } from './list-post-create-popup.component';
@NgModule({
  declarations: [ListPostCreatePopupComponent],
  imports: [
    CommonModule,
    ListPostCreatePopupRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    IconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MaterialModule,
    CustomInputDateModule,
    CustomInputModule,
    CustomButtonModule,
    CustomTableModule,
    CustomTextareaModule,
    CustomCheckboxModule,
    CustomSelectModule,
    NgxMatSelectSearchModule,
    QuillModule.forRoot(),
  ],
  entryComponents: [ListPostCreatePopupComponent],
})
export class ListJobsCreatePopupModule {}
