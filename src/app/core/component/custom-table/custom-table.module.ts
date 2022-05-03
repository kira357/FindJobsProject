import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ContainerModule } from '../../directives/container/container.module';
import { PageLayoutModule } from '../page-layout/page-layout.module';
import { CustomTableComponent } from './custom-table.component';
@NgModule({
  declarations: [CustomTableComponent],
  imports: [
    CommonModule,
    PageLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContainerModule,
    FlexLayoutModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    // MatTooltipModule,
    MatSelectModule,
    // MatButtonToggleModule
    MatProgressBarModule,
  ],
  exports: [CustomTableComponent],
})
export class CustomTableModule {}
