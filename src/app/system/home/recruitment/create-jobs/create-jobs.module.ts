import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from '../../../../material.module';
import { ApiService } from 'src/app/service/api.service';

@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    MaterialModule,
  ],
  providers: [ApiService],
  declarations: [CreateJobsComponent],
})
export class CreateJobsModule {}
