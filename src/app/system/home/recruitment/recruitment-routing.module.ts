import { ListCommentModule } from './list-comment/list-comment.module';
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
      {
        path: 'recruitment-list-jobs',
        loadChildren: () =>
          import('./recruitment-list-jobs/recruitment-list-jobs.module').then(
            (m) => m.RecruitmentListJobsModule
          ),
      },
      {
        path: 'recruitment-list-post',
        loadChildren: () =>
          import('./recruitment-list-post/recruitment-list-post.module').then(
            (m) => m.RecruitmentListPostModule
          ),
      },
      {
        path: 'list-cv',
        loadChildren: () =>
          import('./list-cv/list-cv.module').then(
            (m) => m.ListCvModule
          ),
      },
      {
        path: 'list-comment',
        loadChildren: () =>
          import('./list-comment/list-comment.module').then(
            (m) => m.ListCommentModule
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
