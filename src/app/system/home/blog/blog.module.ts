import { BodyBlogModule } from './body-blog/body-blog.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { HeaderModule } from '../client/header/header.module';
import { RouterModule, Routes } from '@angular/router';
import { DetailBlogModule } from './detail-blog/detail-blog.module';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    HeaderModule,
    BodyBlogModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BlogComponent],
})
export class BlogModule {}
