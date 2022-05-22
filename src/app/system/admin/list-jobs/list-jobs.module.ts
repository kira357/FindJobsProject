import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListJobsComponent } from './list-jobs/list-jobs.component';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
import { ListJobsService } from './list-jobs.service';
import { ListJobsCreatePopupModule } from '../../home/recruitment/recruitment-list-jobs/popups/list-jobs-create-popup.module';

const routes: Routes = [
  {
    path: '',
    component: ListJobsComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),CustomTableModule],
  declarations: [ListJobsComponent],
  exports: [ListJobsComponent],
  entryComponents: [ListJobsCreatePopupModule],
  providers: [ListJobsService],
})
export class ListJobsModule {}
