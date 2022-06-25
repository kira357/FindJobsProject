import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderModule } from '../client/header/header.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../client/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    ReactiveFormsModule,
  ],
  declarations: [ResumeComponent],
})
export class ResumeModule {}
