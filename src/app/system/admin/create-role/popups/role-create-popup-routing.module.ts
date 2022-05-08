import { QuicklinkModule } from 'ngx-quicklink';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleCreatePopupComponent } from './role-create-popup.component';

const routes: Routes = [
  {
    path: '',
    component: RoleCreatePopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class RoleCreatePopupRoutingModule {}
