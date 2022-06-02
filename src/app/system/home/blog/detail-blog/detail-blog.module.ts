import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailBlogComponent } from './detail-blog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { MaterialModule } from 'src/app/material.module';
import { HeaderModule } from '../../client/header/header.module';
import { BodyBlogModule } from '../body-blog/body-blog.module';


const routes: Routes = [
  {
    path: '',
    component: DetailBlogComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomTextareaModule,
    MatFormFieldModule,
    MaterialModule,
    HeaderModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DetailBlogComponent],
})
export class DetailBlogModule {}
