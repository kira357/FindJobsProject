import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListJobsComponent } from './list-jobs.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListJobsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListJobsComponent]
})
export class ListJobsModule { }
