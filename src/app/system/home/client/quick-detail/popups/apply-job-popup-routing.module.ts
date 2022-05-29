import { QuicklinkModule } from 'ngx-quicklink';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyJobPopupComponent } from './apply-job-popup.component';

const routes: Routes = [
  {
    path: '',
    component: ApplyJobPopupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class ApplyJobPopupRoutingModule {}
