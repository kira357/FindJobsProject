import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

export const featureRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./system/admin/admin-page-login/admin-page-login.module').then(
        (m) => m.AdminPageLoginModule
      ),
  },
  {
    path: 'list-jobs',
    loadChildren: () =>
      import('./system/admin/list-jobs/list-jobs.module').then(
        (m) => m.ListJobsModule
      ),
  },
  {
    path: 'list-post',
    loadChildren: () =>
      import('./system/admin/list-post/list-post.module').then(
        (m) => m.ListPostModule
      ),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./system/admin/create-account/create-account.module').then(
        (m) => m.CreateAccountModule
      ),
  },
];
