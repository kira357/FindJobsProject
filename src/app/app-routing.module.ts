import { AdminPageMainComponent } from './system/admin/admin-page-main/admin-page-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { featureRoutes } from './app-feature-routing.module';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPageMainComponent,
    children: [...featureRoutes],
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
