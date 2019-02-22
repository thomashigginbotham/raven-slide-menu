import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SlideMenuComponent } from './slide-menu.component';

@NgModule({
  declarations: [SlideMenuComponent],
  imports: [
    BrowserModule
  ],
  exports: [SlideMenuComponent]
})
export class SlideMenuModule { }
