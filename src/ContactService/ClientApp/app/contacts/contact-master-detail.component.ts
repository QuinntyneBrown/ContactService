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
            this.contacts = state.contacts;
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

        this._store.select("contacts",
            x => x.action.payload.correlationId == correlationId)
            .subscribe(contacts => this.contacts = contacts);
    }

    public tryToDelete($event) {   
        const correlationId = guid();
        this._store.dispatch({
            type: contactsActions.CONTACT_DELETE,
            payload: {
                contact: $event.detail.contact,
                correlationId
            }
        });            
    }

    public async tryToEdit($event) {        
        const correlationId = guid();
        this._store.dispatch({
            type: contactsActions.CONTACT_EDIT,
            payload: {
                contact: $event.detail.contact,
                correlationId
            }
        });       
    }    

    contact = {};
    contacts: Array<any> = [];
}
