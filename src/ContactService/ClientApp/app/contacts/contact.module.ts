import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";

import {ContactEditComponent} from './contact-edit.component';
import {ContactPaginatedListComponent} from './contact-paginated-list.component';
import {ContactListItemComponent} from "./contact-list-item.component";

import {ContactsService} from "./contacts.service";

const declarables = [
    ContactEditComponent,
    ContactPaginatedListComponent,
    ContactListItemComponent
];

const providers = [
    ContactsService,    
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, HttpClientModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ContactsModule { }
