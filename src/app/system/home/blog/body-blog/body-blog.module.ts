import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyBlogComponent } from './body-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes: Routes = [
  {
    path: '',
    component: BodyBlogComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxPaginationModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BodyBlogComponent],
  exports: [BodyBlogComponent],
})
export class BodyBlogModule {}
