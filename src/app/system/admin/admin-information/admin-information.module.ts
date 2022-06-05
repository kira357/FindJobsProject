import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { AdminInformationComponent } from './admin-information.component';

const routes: Routes = [
  {
    path: '',
    component: AdminInformationComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminInformationComponent],
})
export class AdminInformationModule {}
