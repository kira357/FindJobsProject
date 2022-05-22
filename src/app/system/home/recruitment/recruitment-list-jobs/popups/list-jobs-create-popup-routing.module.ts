import { QuicklinkModule } from 'ngx-quicklink';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJobsCreatePopupComponent } from './list-jobs-create-popup.component';

const routes: Routes = [
  {
    path: '',
    component: ListJobsCreatePopupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class ListJobsCreatePopupRoutingModule {}
