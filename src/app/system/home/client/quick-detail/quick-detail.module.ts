import { ApplyJobPopupModule } from './popups/apply-job-popup.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickDetailComponent } from './quick-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  {
    path: '',
    component: QuickDetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    MatFormFieldModule,
    CustomInputModule,
  ],
  declarations: [QuickDetailComponent],
  exports: [QuickDetailComponent],
  entryComponents: [ApplyJobPopupModule],
})
export class QuickDetailModule {}
