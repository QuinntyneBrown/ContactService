import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {ContactsModule} from "../app/contacts";
import {SharedModule} from "../app/shared";
import {UsersModule} from "../app/users/users.module";

import {AppComponent} from './app.component';

import {
    RoutingModule,
    routedComponents
} from "./app.routing";

const declarables = [
    AppComponent,
    routedComponents
];

const providers = [

];

@NgModule({
    imports: [
        RoutingModule,
        BrowserModule,
        HttpModule,
        CommonModule,
        FormsModule,
        RouterModule,

        ContactsModule,
        SharedModule,
        UsersModule

    ],
    providers: providers,
    declarations: [declarables],
    exports: [declarables],
    bootstrap: [AppComponent]
})
export class AppModule { }

