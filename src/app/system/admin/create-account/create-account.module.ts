import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: CreateAccountComponent,
  },
];
@NgModule({
  imports: [CommonModule],
  declarations: [CreateAccountComponent],
})
export class CreateAccountModule {}
