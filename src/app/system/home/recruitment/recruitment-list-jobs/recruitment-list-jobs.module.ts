import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentListJobsComponent } from './recruitment-list-jobs/recruitment-list-jobs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentListJobsComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [RecruitmentListJobsComponent],
})
export class RecruitmentListJobsModule {}
