import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MasterPageComponent } from './master-page.component';
import { AppRoutingModule } from './app-routing.module';

import { baseUrl } from './core/constants';

import { ContactsModule } from './contact/contacts.module';

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ContactsModule
  ],
  providers: [
    { provide: baseUrl, useValue: 'http://localhost:40218/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
