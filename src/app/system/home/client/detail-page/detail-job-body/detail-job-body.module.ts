import { CustomTextareaModule } from './../../../../../core/component/custom-textarea/custom-textarea.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailJobBodyComponent } from './detail-job-body.component';
import { ApplyJobPopupModule } from '../../quick-detail/popups/apply-job-popup.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CommentboxModule } from 'src/app/core/component/commentbox/commentbox.module';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  {
    path: '',
    component: DetailJobBodyComponent,
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
    RouterModule.forChild(routes),
  ],
  declarations: [DetailJobBodyComponent],
  exports: [DetailJobBodyComponent],
  entryComponents: [ApplyJobPopupModule],
})
export class DetailJobBodyModule {}
