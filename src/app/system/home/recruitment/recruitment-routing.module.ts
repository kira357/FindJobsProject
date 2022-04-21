import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentComponent } from './recruitment.component';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      {
        path: 'create-jobs',
        loadChildren: () =>
          import('./create-jobs/create-jobs.module').then(
            (m) => m.CreateJobsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruitmentRoutingModule {}
