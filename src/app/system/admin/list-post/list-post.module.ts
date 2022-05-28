import { ListJobsCreatePopupModule } from './../../home/recruitment/recruitment-list-jobs/popups/list-jobs-create-popup.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './list-post/list-post.component';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';

const routes: Routes = [
  {
    path: '',
    component: ListPostComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),CustomTableModule],
  declarations: [ListPostComponent],
  entryComponents: [ListJobsCreatePopupModule],
})
export class ListPostModule {}
