import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderModule } from '../client/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
  },
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), HeaderModule
  ],
  declarations: [ResumeComponent]
})
export class ResumeModule { }
