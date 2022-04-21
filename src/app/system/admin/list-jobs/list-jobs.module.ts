import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListJobsComponent } from './list-jobs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListJobsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ListJobsComponent],
  exports: [ListJobsComponent]
})
export class ListJobsModule { }
