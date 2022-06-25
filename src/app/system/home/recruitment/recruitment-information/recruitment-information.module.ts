import { CustomInputModule } from './../../../../core/component/custom-input/custom-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { RecruitmentInformationComponent } from './recruitment-information.component';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomCheckboxModule } from 'src/app/core/component/custom-checkbox/custom-checkbox.module';
import { CustomSelectModule } from 'src/app/core/component/custom-select/custom-select.module';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuillModule } from 'ngx-quill';
const routes: Routes = [
  {
    path: '',
    component: RecruitmentInformationComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
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
    MatExpansionModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  declarations: [RecruitmentInformationComponent],
})
export class RecruitmentInformationModule {}
