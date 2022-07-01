import { FooterModule } from './../../client/footer/footer.module';
import { HeaderModule } from './../../client/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRecruitmentComponent } from './detail-recruitment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentboxModule } from 'src/app/core/component/commentbox/commentbox.module';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: DetailRecruitmentComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomTextareaModule,
    MatFormFieldModule,
    MaterialModule,
    CommentboxModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
  ],
  declarations: [DetailRecruitmentComponent],
})
export class DetailRecruitmentModule {}
