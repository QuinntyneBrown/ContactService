import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./shared";
import {LoginPageComponent} from "./users/login-page.component";
import {ContactMasterDetailComponent} from "./contacts/contact-master-detail.component";
import {ContactPaginatedListPageComponent} from "./contacts/contact-paginated-list-page.component";
import {ContactEditPageComponent} from "./contacts/contact-edit-page.component";
import {SetTenantPageComponent} from "./tenants/set-tenant-page.component";
import {TenantGuardService} from "./shared/guards/tenant-guard.service";

export const routes: Routes = [
    {
        path: '',
        component: ContactPaginatedListPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService
        ]        
    },
    {
        path: 'contacts',
        component: ContactPaginatedListPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService
        ]
    },
    {
        path: 'contacts/create',
        component: ContactEditPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService
        ]
    },
    {
        path: 'contacts/:id',
        component: ContactEditPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService
        ]
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
    ContactMasterDetailComponent,
    ContactEditPageComponent,
    ContactPaginatedListPageComponent,
    LoginPageComponent,
    SetTenantPageComponent
];