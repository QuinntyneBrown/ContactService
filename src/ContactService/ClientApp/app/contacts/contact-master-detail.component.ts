import {Component} from "@angular/core";
import {guid} from "../shared/utilities/guid";
import {ContactsStore as Store,IAction} from "./contacts-store";
import {contactsActions} from "./contacts.actions";
import {addOrUpdate} from "../shared/utilities/add-or-update";
import {pluckOut} from "../shared/utilities/pluck-out";

@Component({
    templateUrl: "./contact-master-detail.component.html",
    styleUrls: ["./contact-master-detail.component.css"],
    selector: "ce-contact-master-detail"
})
export class ContactMasterDetailComponent {
    constructor(private _store: Store) {
        _store.subscribe((state) => {           
            this.contacts = state.filter.mode ? state.filter.contacts : state.contacts;
            this.contact = state.contact;
        });
    }
    
    public async ngOnInit() {                
        this._store.dispatch({
            type: contactsActions.CONTACT_GET,
            payload: null
        });          
    }
    
    public tryToSave($event) {
        const correlationId = guid();
        this._store.dispatch({
            type: contactsActions.CONTACT_ADD_OR_UPDATE,
            payload: {
                contact: $event.detail.contact,
                correlationId
            }
        });

        // add or update list

        this.contact = {};

        this._store.filter(x => x.contactAddOrUpdateResponse.correlationId == correlationId)
            .subscribe(x => {
                
            });
    }

    public tryToDelete($event) {            
        const correlationId = guid();
        this._store.dispatch({
            type: contactsActions.CONTACT_REMOVE,
            payload: {
                contact: $event.detail.contact,
                correlationId
            }
        });    

        this._store.filter(x => x.contactRemoveResponse.correlationId == correlationId)
            .subscribe(x => {

            });
    }

    public async tryToEdit($event) {                
        this._store.dispatch({
            type: contactsActions.CONTACT_EDIT,
            payload: {
                contact: $event.detail.contact                
            }
        });       
    }    

    public handleContactsFilterKeyUp($event) {
        const correlationId = guid();

        this._store.dispatch({
            type: contactsActions.CONTACTS_FILTER_KEY_UP,
            payload: {
                value: $event.detail.value,
                correlationId
            }
        });

        this._store.filter(x => x.filter.correlationId == correlationId)
            .subscribe(x => { });
    }

    contact = {};
    contacts: Array<any> = [];
}
