import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentChatComponent } from './recruitment-chat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FooterModule } from '../../client/footer/footer.module';
import { HeaderModule } from '../../client/header/header.module';
const routes: Routes = [
  {
    path: '',
    component: RecruitmentChatComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [RecruitmentChatComponent],
})
export class RecruitmentChatModule {}
