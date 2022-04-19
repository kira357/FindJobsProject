import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageMainComponent } from './admin-page-main/admin-page-main.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: AdminPageMainComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminPageMainComponent],
})
export class AdminPageMainModule {}
