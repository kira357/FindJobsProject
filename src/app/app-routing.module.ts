import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './system/home/client/client.component';
import { ResumeComponent } from './system/home/resume/resume/resume.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./system/home/client/client.module').then((m) => m.ClientModule),
  },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./system/home/client/client.module').then((m) => m.ClientModule),
  // },

  {
    path: 'blog',
    loadChildren: () =>
      import('./system/home/blog/blog.module').then((m) => m.BlogModule),
  },

  {
    path: 'chat',
    loadChildren: () =>
      import('./system/home/chat/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'resume',
    component: ResumeComponent,
  },
  {
    path: 'create-cv',
    loadChildren: () =>
      import('./system/home/page-CV/page-CV.module').then(
        (m) => m.PageCVModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./system/home/information/information.module').then(
        (m) => m.InformationModule
      ),
  },
  {
    path: 'detail-job/:id',
    loadChildren: () =>
      import('./system/home/client/detail-page/detail-job.module').then(
        (m) => m.DetailJobModule
      ),
  },
  {
    path: 'detail-blog/:id',
    loadChildren: () =>
      import('./system/home/blog/detail-blog/detail-blog.module').then(
        (m) => m.DetailBlogModule
      ),
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
