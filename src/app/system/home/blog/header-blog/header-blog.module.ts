import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBlogComponent } from './header-blog.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderBlogComponent,
  },
];
@NgModule({
  imports: [CommonModule ,RouterModule.forChild(routes)],
  declarations: [HeaderBlogComponent],
  exports: [HeaderBlogComponent],
})
export class HeaderBlogModule {}
