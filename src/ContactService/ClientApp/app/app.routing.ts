import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from "./users/login-page.component";
import {SetTenantPageComponent} from "./tenants/set-tenant-page.component";
import {TenantGuardService} from "./shared/guards/tenant-guard.service";

import {CONTACT_ROUTES} from "./contacts/contact.module";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch:'full'
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
    ...CONTACT_ROUTES,
    ...routes
]);

export const routedComponents = [
    LoginPageComponent,
    SetTenantPageComponent
];