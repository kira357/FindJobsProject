import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentListJobsComponent } from './recruitment-list-jobs/recruitment-list-jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
import { RecruitmentListJobsService } from './recruitment-list-jobs/recruitment-list-jobs.service';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentListJobsComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CustomTableModule],
  declarations: [RecruitmentListJobsComponent],
  providers: [RecruitmentListJobsService],
})
export class RecruitmentListJobsModule {}
