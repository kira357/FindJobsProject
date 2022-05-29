import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyBlogComponent } from './body-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, NgxPaginationModule],
  declarations: [BodyBlogComponent],
  exports: [BodyBlogComponent],
})
export class BodyBlogModule {}
