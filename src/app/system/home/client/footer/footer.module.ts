import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
