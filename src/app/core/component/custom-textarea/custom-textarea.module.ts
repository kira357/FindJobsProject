import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from '../../pipe/pipe.module';
import { CustomTextareaComponent } from './custom-textarea.component';

@NgModule({
  declarations: [CustomTextareaComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [CustomTextareaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomTextareaModule {}
