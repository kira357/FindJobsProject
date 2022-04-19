import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageLoginComponent } from './admin-page-login.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: AdminPageLoginComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminPageLoginComponent],
})
export class AdminPageLoginModule {}
