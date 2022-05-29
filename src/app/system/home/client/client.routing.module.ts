import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DetailPageModule } from './detail-page/detail-page.module';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
         path: 'quick-detail/:id',
          loadChildren: () =>
          import('./quick-detail/quick-detail.module').then((m) => m.QuickDetailModule),
      },
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
