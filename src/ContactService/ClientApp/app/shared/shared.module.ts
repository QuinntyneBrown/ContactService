import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";

import {AuthenticationService} from "./services/authentication.service";
import {LoginRedirectService} from "./services/login-redirect.service";
import {EventHub} from "./services/event-hub";
import {Storage} from "./services/storage.service";
import {ErrorService} from "./services/error.service";

import {AuthGuardService} from "./guards/auth-guard.service"
import {TenantGuardService} from "./guards/tenant-guard.service";
import {EventHubConnectionGuardService} from "./guards/event-hub-connection-guard.service";

import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {TenantInterceptor} from "./interceptors/tenant.interceptor";

import {HeaderComponent} from "./components/header.component";
import {LeftNavComponent} from "./components/left-nav.component";
import {PagerComponent} from "./components/pager.component";
import {TabContentComponent} from "./components/tab-content.component";
import {TabTitleComponent} from "./components/tab-title.component";
import {TabsComponent} from "./components/tabs.component";

const providers = [
    EventHub,
    AuthGuardService,
    AuthenticationService,
    ErrorService,
    LoginRedirectService,  
    TenantGuardService,  
    EventHubConnectionGuardService,
    Storage,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TenantInterceptor,
        multi: true
    }
];

const declarables = [
    HeaderComponent,
    LeftNavComponent,
    PagerComponent,
    TabContentComponent,
    TabTitleComponent,
    TabsComponent
];

@NgModule({
    imports: [CommonModule, RouterModule, HttpClientModule],
    entryComponents: [],
    declarations: [declarables],
    exports:[declarables],
    providers: providers
})
export class SharedModule {}