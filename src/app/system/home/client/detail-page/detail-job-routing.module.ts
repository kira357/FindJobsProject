import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailJobComponent } from './detail-job.component';

export const routes: Routes = [
  {
    path: '',
    component: DetailJobComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailJobRoutingModule {}
