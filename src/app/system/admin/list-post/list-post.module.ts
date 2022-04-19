import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostComponent } from './list-post.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListPostComponent,
  },
];
@NgModule({
  imports: [CommonModule],
  declarations: [ListPostComponent],
})
export class ListPostModule {}
