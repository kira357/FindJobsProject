import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageMainComponent } from './admin-page-main.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule, AdminRoutingModule],
  declarations: [AdminPageMainComponent],
  exports: [AdminPageMainComponent],
})
export class AdminPageMainModule {}
