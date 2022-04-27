import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCvComponent } from './list-cv/list-cv.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListCvComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ListCvComponent],
})
export class ListCvModule {}
