import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentRegisterComponent } from './recruitment-register/recruitment-register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentRegisterComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CustomInputModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RecruitmentRegisterComponent]
})
export class RecruitmentRegisterModule { }
