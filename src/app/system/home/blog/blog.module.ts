import { BodyBlogModule } from './body-blog/body-blog.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { HeaderBlogModule } from './header-blog/header-blog.module';

@NgModule({
  imports: [CommonModule, BlogRoutingModule, HeaderBlogModule, BodyBlogModule],
  declarations: [BlogComponent],
})
export class BlogModule {}
