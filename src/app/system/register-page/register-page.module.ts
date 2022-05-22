import { CustomInputModule } from './../../core/component/custom-input/custom-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
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
  declarations: [RegisterPageComponent],
})
export class RegisterPageModule {}
