import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './system/home/client/client.component';
import { DetailPageComponent } from './system/home/client/detail-page/detail-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./system/home/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./system/home/client/client.module').then((m) => m.ClientModule),
  },

  {
    path: 'blog',
    loadChildren: () =>
      import('./system/home/blog/blog.module').then((m) => m.BlogModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./system/admin/admin-page-main.module').then(
        (m) => m.AdminPageMainModule
      ),
  },
  {
    path: 'recruitment',
    loadChildren: () =>
      import('./system/home/recruitment/recruitment.module').then(
        (m) => m.RecruitmentModule
      ),
  },
  {
    path: 'account',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./system/login-page/login-page.module').then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./system/register-page/register-page.module').then(
            (m) => m.RegisterPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./core/errors/error-404/error-404.module').then(
        (m) => m.Error404Module
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
