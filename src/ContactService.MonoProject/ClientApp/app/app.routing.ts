import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./shared";
import {LoginPageComponent} from "./users/login-page.component";
import {ContactMasterDetailComponent} from "./contacts/contact-master-detail.component";

export const routes: Routes = [
    {
        path: '',
        component: ContactMasterDetailComponent,
        canActivate:[AuthGuardService]
        
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
];

export const RoutingModule = RouterModule.forRoot([
    ...routes
]);

export const routedComponents = [
    ContactMasterDetailComponent,
    LoginPageComponent
];