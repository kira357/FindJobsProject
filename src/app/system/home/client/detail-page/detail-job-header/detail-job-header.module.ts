import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailJobHeaderComponent } from './detail-job-header.component';

const routes: Routes = [
  {
    path: '',
    component: DetailJobHeaderComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [DetailJobHeaderComponent],
  exports: [DetailJobHeaderComponent],
})
export class DetailJobHeaderModule {}
