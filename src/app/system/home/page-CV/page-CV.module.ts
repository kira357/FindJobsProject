import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCVComponent } from './page-CV/page-CV.component';
import { HeaderModule } from '../client/header/header.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PageCVComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HeaderModule],
  declarations: [PageCVComponent],
})
export class PageCVModule {}
