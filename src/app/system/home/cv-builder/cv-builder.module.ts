import { NgModule } from '@angular/core';
import { CvBuilderComponent } from './cv-builder.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderModule } from '../client/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: CvBuilderComponent,
  },
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), HeaderModule
  ],
  declarations: [CvBuilderComponent]
})
export class CvBuilderModule { }
