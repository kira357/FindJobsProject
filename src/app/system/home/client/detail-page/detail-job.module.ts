import { FooterModule } from './../footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailJobComponent } from './detail-job.component';
import { HeaderModule } from '../header/header.module';
import { DetailJobHeaderModule } from './detail-job-header/detail-job-header.module';
import { DetailJobBodyModule } from './detail-job-body/detail-job-body.module';
import { DetailJobRoutingModule } from './detail-job-routing.module';

const routes: Routes = [
  {
    path: '',
    component: DetailJobComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DetailJobRoutingModule,
    DetailJobHeaderModule,
    DetailJobBodyModule,
    FooterModule
  ],
  declarations: [DetailJobComponent],
  exports: [DetailJobComponent],
})
export class DetailJobModule {}
