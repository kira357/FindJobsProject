import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyBlogComponent } from './body-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
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
    RouterModule.forChild(routes),
  ],
  declarations: [BodyBlogComponent],
  exports: [BodyBlogComponent],
})
export class BodyBlogModule {}
