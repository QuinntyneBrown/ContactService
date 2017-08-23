import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {TenantsModule} from "../tenants/tenants.module";
import {RouterModule, Routes} from "@angular/router";
import {SetTenantPageComponent} from "../tenants/set-tenant-page.component";
import {TenantGuardService} from "../shared/guards/tenant-guard.service";
import {EventHubConnectionGuardService} from "../shared/guards/event-hub-connection-guard.service";
import {AuthGuardService} from "../shared/guards/auth-guard.service";

import {ContactEditComponent} from './contact-edit.component';
import {ContactEditPageComponent} from './contact-edit-page.component';
import {ContactPaginatedListComponent} from './contact-paginated-list.component';
import {ContactPaginatedListPageComponent} from './contact-paginated-list-page.component';
import {ContactListItemComponent} from "./contact-list-item.component";

import { ContactsService } from "./contacts.service";

export const CONTACT_ROUTES: Routes = [
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
        ]
    }
];

const declarables = [
    ContactEditComponent,
    ContactEditPageComponent,
    ContactPaginatedListComponent,
    ContactPaginatedListPageComponent,
    ContactListItemComponent
];

const providers = [
    ContactsService,    
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, HttpClientModule, RouterModule, TenantsModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ContactsModule { }
