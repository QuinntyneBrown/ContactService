import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {ContactEditComponent} from './contact-edit.component';
import {ContactListComponent} from './contact-list.component';
import {ContactListItemComponent} from "./contact-list-item.component";
import {ContactMasterDetailComponent} from "./contact-master-detail.component";

import {ContactsService} from "./contacts.service";

const declarables = [
    ContactEditComponent,
    ContactListComponent,
    ContactListItemComponent
];

const providers = [ContactsService];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ContactsModule { }
