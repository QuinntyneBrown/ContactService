import {Component} from "@angular/core";
import {guid} from "../shared/utilities/guid";
import {ContactsStore as Store,IAction} from "./contacts-store";
import {contactsActions} from "./contacts.actions";
import {addOrUpdate} from "../shared/utilities/add-or-update";
import {pluckOut} from "../shared/utilities/pluck-out";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    templateUrl: "./contact-master-detail.component.html",
    styleUrls: ["./contact-master-detail.component.css"],
    selector: "ce-contact-master-detail"
})
export class ContactMasterDetailComponent {
    constructor(private _store: Store) {
        this.contacts$ = new BehaviorSubject([]);

        _store.subscribe((state) => {           
            this.contacts = state.filter.mode ? state.filter.contacts : state.contacts;
            this.contact = state.contact;
            this.contacts$.next(state.filter.mode ? state.filter.contacts : state.contacts);
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
        let contact = $event.detail.contact;

        this._store.dispatch({
            type: contactsActions.CONTACT_ADD_OR_UPDATE,
            payload: {
                contact,
                correlationId
            }
        });
        
        this.contact = {};

        this._store.filter(x => x.contactAddOrUpdateResponse.correlationId == correlationId)
            .subscribe(x => {
                this._store.dispatch({
                    type: contactsActions.CONTACT_GET,
                    payload: null
                });
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

        
        pluckOut({
            value: $event.detail.contact.id,
            items: this.contacts
        });
        
        this.contacts = this.contacts.slice(0);

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
    contacts$: BehaviorSubject<any>;
}
