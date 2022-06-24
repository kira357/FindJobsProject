import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobPageComponent } from './job-page.component';

export const routes: Routes = [
  {
    path: '',
    component: JobPageComponent,
    children: [
      {
        path: 'quick-detail/:id',
        loadChildren: () =>
          import('../client/quick-detail/quick-detail.module').then(
            (m) => m.QuickDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPageRoutingModule {}
