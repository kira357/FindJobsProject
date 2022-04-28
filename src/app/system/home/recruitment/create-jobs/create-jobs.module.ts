import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from '../../../../material.module';
import { ApiService } from 'src/app/services/api.service';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';

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
  ],
  providers: [ApiService],
  declarations: [CreateJobsComponent],
})
export class CreateJobsModule {}
