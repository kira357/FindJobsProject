import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { RouterModule, Routes } from '@angular/router';
import { ListCommentService } from './list-comment/list-comment.service';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';

const routes: Routes = [
  {
    path: '',
    component: ListCommentComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CustomTableModule],
  declarations: [ListCommentComponent],
  providers: [ListCommentService],
})
export class ListCommentModule {}
