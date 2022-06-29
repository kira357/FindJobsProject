import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { CustomSelectModule } from 'src/app/core/component/custom-select/custom-select.module';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { MaterialModule } from 'src/app/material.module';
import { FooterModule } from '../client/footer/footer.module';
import { HeaderModule } from '../client/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: AppliedJobsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomTextareaModule,
    MatFormFieldModule,
    MaterialModule,
    CustomInputModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CustomInputDateModule,
    CustomButtonModule,
    CustomTextareaModule,
    CustomSelectModule,
    HeaderModule,
    FooterModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AppliedJobsComponent],
})
export class AppliedJobsModule {}
