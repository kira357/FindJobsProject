import { CustomTextareaModule } from './../../../../core/component/custom-textarea/custom-textarea.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { QuillModule } from 'ngx-quill';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePostComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CustomInputModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CustomInputDateModule,
    CustomButtonModule,
    CustomTextareaModule
  ],
  declarations: [CreatePostComponent]
})
export class CreatePostModule { }
