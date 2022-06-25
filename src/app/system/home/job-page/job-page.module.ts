import { JobPageRoutingModule } from './job-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPageComponent } from './job-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { MaterialModule } from 'src/app/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HeaderModule } from '../client/header/header.module';
import { FooterModule } from '../client/footer/footer.module';
const routes: Routes = [
  {
    path: '',
    component: JobPageComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    MatFormFieldModule,
    CustomInputModule,
    JobPageRoutingModule,
    NgxPaginationModule,
    NgxMatSelectSearchModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
  ],
  declarations: [JobPageComponent],
  exports: [JobPageComponent],
})
export class JobPageModule {}
