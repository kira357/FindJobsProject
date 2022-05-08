import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomCheckboxComponent } from './custom-checkbox.component';

@NgModule({
  declarations: [CustomCheckboxComponent],
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  exports: [CustomCheckboxComponent],
})
export class CustomCheckboxModule {}
