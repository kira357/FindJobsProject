import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentComponent } from './recruitment.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    IconModule,
    MatIconModule,
    FlexLayoutModule,
    RecruitmentRoutingModule,
  ],
  declarations: [RecruitmentComponent],
  exports: [RecruitmentComponent],
})
export class RecruitmentModule {}
