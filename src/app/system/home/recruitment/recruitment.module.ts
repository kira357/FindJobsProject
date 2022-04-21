import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentComponent } from './recruitment.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { RecruitmentRoutingModule } from './recruitment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RecruitmentRoutingModule,
  ],
  declarations: [RecruitmentComponent],
  exports: [RecruitmentComponent],
})
export class RecruitmentModule {}
