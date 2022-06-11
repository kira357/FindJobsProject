import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../../client/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [CommonModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [ChatComponent],
})
export class ChatModule {}
