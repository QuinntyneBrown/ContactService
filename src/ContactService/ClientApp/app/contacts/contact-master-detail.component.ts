import {Component} from "@angular/core";
import {guid} from "../shared/utilities/guid";
import {ContactsStore as Store,IAction} from "./contacts-store";
import {contactsActions} from "./contacts.actions";

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
            type: contactsActions.CONTACT_SAVE,
            payload: {
                contact: $event.detail.contact,
                correlationId
            }
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
            .subscribe(x => {
                console.log(x);
            });
    }

    contact = {};
    contacts: Array<any> = [];
}
