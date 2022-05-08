import { QuicklinkModule } from 'ngx-quicklink';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MajorCreatePopupComponent } from './major-create-popup.component';

const routes: Routes = [
  {
    path: '',
    component: MajorCreatePopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class MajorCreatePopupRoutingModule {}
