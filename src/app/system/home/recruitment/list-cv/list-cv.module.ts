import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomTableModule } from 'src/app/core/component/custom-table/custom-table.module';
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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomTableModule,
    CustomButtonModule,
  ],
  declarations: [ListCvComponent],
})
export class ListCvModule {}
