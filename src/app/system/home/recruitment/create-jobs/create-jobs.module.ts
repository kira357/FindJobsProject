import { UserService } from './../../../../core/model/user/user.service';
import { CustomButtonModule } from './../../../../core/component/custom-button/custom-button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from '../../../../material.module';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';

const routes: Routes = [
  {
    path: '',
    component: CreateJobsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CustomInputModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CustomInputDateModule,
    CustomButtonModule,
  ],
  providers: [UserService],
  declarations: [CreateJobsComponent],
})
export class CreateJobsModule {}
