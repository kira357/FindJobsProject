import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailJobBodyComponent } from './detail-job-body.component';
import { ApplyJobPopupModule } from '../../quick-detail/popups/apply-job-popup.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [DetailJobBodyComponent],
  exports: [DetailJobBodyComponent],
  entryComponents: [ApplyJobPopupModule],
})
export class DetailJobBodyModule { }
