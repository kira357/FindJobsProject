import { DetailJobModule } from './system/home/client/detail-page/detail-job.module';
import { BlogModule } from './system/home/blog/blog.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageMainModule } from './system/admin/admin-page-main.module';
import { ClientModule } from './system/home/client/client.module';
import { DetailBlogModule } from './system/home/blog/detail-blog/detail-blog.module';
import { WINDOW_PROVIDERS } from './window.providers';
import { ResumeModule } from './system/home/resume/resume.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminPageMainModule,
    ClientModule,
    BlogModule,
    DetailJobModule,
    ReactiveFormsModule,
    ResumeModule

  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
