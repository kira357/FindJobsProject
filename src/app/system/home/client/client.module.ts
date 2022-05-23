import { FooterModule } from './footer/footer.module';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientRoutingModule } from './client.routing.module';
import { MaterialModule } from 'src/app/material.module';
import { BodyModule } from './body/body.module';
import { DetailPageModule } from './detail-page/detail-page.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ClientRoutingModule,
    HeaderModule,
    FooterModule,
    BodyModule,
    DetailPageModule,
  ],
  declarations: [ClientComponent],
  exports: [ClientComponent],
})
export class ClientModule {}
