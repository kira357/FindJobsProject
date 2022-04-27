import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentListPostComponent } from './recruitment-list-post/recruitment-list-post.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: RecruitmentListPostComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [RecruitmentListPostComponent],
})
export class RecruitmentListPostModule {}
