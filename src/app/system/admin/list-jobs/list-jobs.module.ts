import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListJobsComponent } from './list-jobs/list-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: ListJobsComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ListJobsComponent],
  exports: [ListJobsComponent],
})
export class ListJobsModule {}
