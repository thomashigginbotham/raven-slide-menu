import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SlideMenuModule } from 'projects/slide-menu/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SlideMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
