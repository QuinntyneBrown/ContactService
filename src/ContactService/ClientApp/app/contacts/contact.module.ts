import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";

import {ContactEditComponent} from './contact-edit.component';
import {ContactPaginatedListComponent} from './contact-paginated-list.component';
import {ContactListItemComponent} from "./contact-list-item.component";
import {ContactMasterDetailComponent} from "./contact-master-detail.component";

import {ContactsService} from "./contacts.service";
import {ContactsStore} from "./contacts-store";
import {ContactsReducersProvider} from "./contacts-reducers-provider";
import {ContactsEffects} from "./contacts-effects";

const declarables = [
    ContactEditComponent,
    ContactPaginatedListComponent,
    ContactListItemComponent
];

const providers = [
    ContactsService,
    ContactsReducersProvider,
    ContactsEffects,
    ContactsStore
];

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule,SharedModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ContactsModule { }
