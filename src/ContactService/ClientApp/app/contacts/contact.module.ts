import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";

import {ContactEditComponent} from './contact-edit.component';
import {ContactPaginatedListComponent} from './contact-paginated-list.component';
import {ContactListItemComponent} from "./contact-list-item.component";
import {ContactMasterDetailComponent} from "./contact-master-detail.component";

import {ContactsService} from "./contacts.service";
import {ContactsActionCreator} from "./contacts-store";
import {ContactsStore} from "./contacts-store";

const declarables = [
    ContactEditComponent,
    ContactPaginatedListComponent,
    ContactListItemComponent
];

const providers = [
    ContactsService,
    ContactsActionCreator,
    ContactsStore
];

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule,SharedModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ContactsModule { }
