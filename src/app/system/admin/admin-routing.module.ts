import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageMainComponent } from './admin-page-main.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminPageMainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./admin-page-login/admin-page-login.module').then(
            (m) => m.AdminPageLoginModule
          ),
      },
      {
        path: 'list-jobs',
        loadChildren: () =>
          import('./list-jobs/list-jobs.module').then((m) => m.ListJobsModule),
      },
      {
        path: 'list-post',
        loadChildren: () =>
          import('./list-post/list-post.module').then((m) => m.ListPostModule),
      },
      {
        path: 'create-role',
        loadChildren: () =>
          import('./create-role/create-role.module').then(
            (m) => m.CreateRoleModule
          ),
      },
      {
        path: 'create-major',
        loadChildren: () =>
          import('./create-major/create-major.module').then(
            (m) => m.CreateMajorModule
          ),
      },
      {
        path: 'create-account',
        loadChildren: () =>
          import('./create-account/create-account.module').then(
            (m) => m.CreateAccountModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
