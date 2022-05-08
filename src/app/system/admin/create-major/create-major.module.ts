import { CustomSelectModule } from '../../../core/component/custom-select/custom-select.module';
import { CustomCheckboxModule } from '../../../core/component/custom-checkbox/custom-checkbox.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { MaterialModule } from 'src/app/material.module';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { CreateMajorComponent } from './create-major/create-major.component';
import { ListMajorService } from './list-major.service';
import { MajorCreatePopupModule } from './popups/major-create-popup.module';

const routes: Routes = [
  {
    path: '',
    component: CreateMajorComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CustomInputModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CustomInputDateModule,
    CustomButtonModule,
    CustomTableModule,
    CustomTextareaModule,
    CustomCheckboxModule,
    CustomSelectModule,
  ],
  providers: [ListMajorService],
  entryComponents: [MajorCreatePopupModule],
  declarations: [CreateMajorComponent],
})
export class CreateMajorModule {}
