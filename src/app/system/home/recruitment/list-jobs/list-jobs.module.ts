import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListJobsComponent } from './list-jobs/list-jobs.component';
import { MaterialModule } from '../../../../material.module';
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ListJobsComponent],
})
export class ListJobsModule {}
