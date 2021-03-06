import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderModule } from '../client/header/header.module';

const routes: Routes = [
  {
    path: 'resume',
    component: ResumeComponent,
  },
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes, {
      urlUpdateStrategy: 'deferred'
    }), HeaderModule
  ],
  declarations: [ResumeComponent]
})
export class ResumeModule { }
