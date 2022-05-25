import { CustomInputModule } from './../../../../core/component/custom-input/custom-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  {
    path: '',
    component:  BodyComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    MatFormFieldModule,
    CustomInputModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BodyComponent],
  exports: [BodyComponent]
})
export class BodyModule { }
