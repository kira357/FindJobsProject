import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentListPostComponent } from './recruitment-list-post/recruitment-list-post.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
import { ListJobsCreatePopupModule } from './popups/list-post-create-popup.module';
const routes: Routes = [
  {
    path: '',
    component: RecruitmentListPostComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CustomTableModule],
  declarations: [RecruitmentListPostComponent],
  entryComponents: [ListJobsCreatePopupModule],
  providers: [],
})
export class RecruitmentListPostModule {}
