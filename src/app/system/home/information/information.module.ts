import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information/information.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { CommentboxModule } from 'src/app/core/component/commentbox/commentbox.module';
import { CustomTextareaModule } from 'src/app/core/component/custom-textarea/custom-textarea.module';
import { MaterialModule } from 'src/app/material.module';
import { HeaderModule } from '../client/header/header.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomInputDateModule } from 'src/app/core/component/custom-input-date/custom-input-date.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { CustomSelectModule } from 'src/app/core/component/custom-select/custom-select.module';
import { FooterModule } from '../client/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomTextareaModule,
    MatFormFieldModule,
    MaterialModule,
    HeaderModule,
    CommentboxModule,
    CustomInputModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CustomInputDateModule,
    CustomButtonModule,
    CustomTextareaModule,
    CustomSelectModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InformationComponent],
})
export class InformationModule {}
