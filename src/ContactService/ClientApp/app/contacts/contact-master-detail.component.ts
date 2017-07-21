import {Component} from "@angular/core";
import {ContactsActionCreator, ContactsStore} from "./contacts-store";
import {ContactsService} from "./contacts.service";
import {Contact} from "./contact.model";

@Component({
    templateUrl: "./contact-master-detail.component.html",
    styleUrls: ["./contact-master-detail.component.css"],
    selector: "ce-contact-master-detail"
})
export class ContactMasterDetailComponent {
    constructor(
        private _contactsActionCreator: ContactsActionCreator,
        private _contactsService: ContactsService,
        private _contactsStore: ContactsStore
    ) { }

    public async ngOnInit() {
        this._contactsActionCreator.get();
        const response = await this._contactsService.get();
        this.contacts = response.contacts;        
    }
    
    public tryToSave($event) {
        // return an id;
        this._contactsActionCreator.save();
        this._contactsService.add({ contact: $event.detail.contact });
        //add or update contacts
    }

    public tryToDelete($event) {   
        this._contactsActionCreator.remove();     
        this._contactsService.remove({ contact: $event.detail.contact });       
        // pluck 
    }

    public async tryToEdit($event) {        
        this.contact = $event.detail.contact;
    }

    public contacts: Array<Contact> = [];
    public contact: Contact = <Contact>{};
    public get contacts$() {
        return this._contactsStore.contacts$.asObservable();
    }
}
