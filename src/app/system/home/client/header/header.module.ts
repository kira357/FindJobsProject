import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule { }
