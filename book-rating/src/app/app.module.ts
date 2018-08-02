import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonSharedModule } from './button-shared/button-shared.module';
import { registerLocaleData } from '@angular/common';
import localeAt from '@angular/common/locales/de-AT'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonSharedModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-AT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeAt);
  }
}
