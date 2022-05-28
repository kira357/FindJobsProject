import { QuicklinkModule } from 'ngx-quicklink';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostCreatePopupComponent } from './list-post-create-popup.component';


const routes: Routes = [
  {
    path: '',
    component: ListPostCreatePopupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class ListPostCreatePopupRoutingModule {}
