import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./shared/guards/auth-guard.service";
import {LoginPageComponent} from "./users/login-page.component";
import {ContactPaginatedListPageComponent} from "./contacts/contact-paginated-list-page.component";
import {ContactEditPageComponent} from "./contacts/contact-edit-page.component";
import {SetTenantPageComponent} from "./tenants/set-tenant-page.component";
import {TenantGuardService} from "./shared/guards/tenant-guard.service";
import {EventHubConnectionGuardService} from "./shared/guards/event-hub-connection-guard.service";

export const routes: Routes = [
    {
        path: '',
        component: ContactPaginatedListPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]     
    },
    {
        path: 'contacts',
        component: ContactPaginatedListPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]
    },
    {
        path: 'contacts/create',
        component: ContactEditPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]        
    },
    {
        path: 'contacts/:id',
        component: ContactEditPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ],
        canLoad: []
    },
    {
        path: 'tenants/set',
        component: SetTenantPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [
            TenantGuardService
        ]
    }
];

export const RoutingModule = RouterModule.forRoot([
    ...routes
]);

export const routedComponents = [
    ContactEditPageComponent,
    ContactPaginatedListPageComponent,
    LoginPageComponent,
    SetTenantPageComponent
];