import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
