import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {AuthGuardService} from "./services/auth-guard.service"
import {AuthenticationService} from "./services/authentication.service";
import {HttpService, SecuredHttpService} from "./services/http.service";
import {LoginRedirectService} from "./services/login-redirect.service";
import {EventHub} from "./services/event-hub";
import {Storage} from "./services/storage.service";
import {Dispatcher} from "./services/dispatcher";
import {TenantGuardService} from "./guards/tenant-guard.service";

import {HeaderComponent} from "./components/header.component";
import {PagerComponent} from "./components/pager.component";
import {TabContentComponent} from "./components/tab-content.component";
import {TabTitleComponent} from "./components/tab-title.component";
import {TabsComponent} from "./components/tabs.component";

const providers = [
    HttpService,
    SecuredHttpService,
    Dispatcher,
    EventHub,
    AuthGuardService,
    AuthenticationService,
    LoginRedirectService,  
    TenantGuardService,  
    Storage
];

const declarables = [
    HeaderComponent,
    PagerComponent,
    TabContentComponent,
    TabTitleComponent,
    TabsComponent
];

@NgModule({
    imports: [CommonModule, RouterModule],
    entryComponents: [],
    declarations: [declarables],
    exports:[declarables],
    providers: providers
})
export class SharedModule {}