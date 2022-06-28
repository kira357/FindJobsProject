import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientRoutingModule } from './client.routing.module';
import { MaterialModule } from 'src/app/material.module';
import { BodyModule } from './body/body.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ClientRoutingModule,
    HeaderModule,
    FooterModule,
    BodyModule,
  ],
  declarations: [ClientComponent],
  exports: [ClientComponent],
})
export class ClientModule {}
