import { CustomTextareaModule } from './../../../../core/component/custom-textarea/custom-textarea.module';
import { CustomCheckboxModule } from './../../../../core/component/custom-checkbox/custom-checkbox.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { CustomButtonModule } from 'src/app/core/component/custom-button/custom-button.module';
import { CustomInputModule } from 'src/app/core/component/custom-input/custom-input.module';
import { RoleCreatePopupRoutingModule } from './role-create-popup-routing.module';
import { RoleCreatePopupComponent } from './role-create-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
@NgModule({
  declarations: [RoleCreatePopupComponent],
  imports: [
    CommonModule,
    RoleCreatePopupRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    IconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    CustomInputModule,
    CustomButtonModule,
    MatDialogModule,
    MaterialModule,
    CustomCheckboxModule,
    CustomTextareaModule
  ],
  entryComponents: [RoleCreatePopupComponent],
})
export class RoleCreatePopupModule {}
