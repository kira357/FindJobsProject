import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
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
