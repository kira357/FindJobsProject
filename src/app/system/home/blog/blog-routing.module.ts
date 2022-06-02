import { HeaderModule } from './../client/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
