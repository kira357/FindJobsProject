import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentboxComponent } from './commentbox.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material.module';
import { CustomTextareaModule } from '../custom-textarea/custom-textarea.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomTextareaModule,
    MatFormFieldModule,
    MaterialModule,
  ],
  declarations: [CommentboxComponent],
  exports: [CommentboxComponent],
})
export class CommentboxModule {}
