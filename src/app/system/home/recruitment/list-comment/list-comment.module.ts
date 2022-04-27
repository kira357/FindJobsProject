import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListCommentComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ListCommentComponent],
})
export class ListCommentModule {}
