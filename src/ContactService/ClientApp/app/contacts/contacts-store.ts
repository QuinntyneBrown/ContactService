import {Injectable, Inject} from "@angular/core";
import {Subject} from "rxjs/subject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Contact} from "./contact.model";
import {ContactsService} from "./contacts.service";
import {Dispatcher,IAction} from "../shared/services/dispatcher";
import {Storage} from "../shared/services/storage.service";
import {ContactsEffects} from "./contacts-effects";
import {ContactsReducersProvider} from "./contacts-reducers-provider";

export {IAction} from "../shared/services/dispatcher"

@Injectable()
export class ContactsStore extends BehaviorSubject<any> {
    constructor(
        private _storage: Storage,
        private _contactsReducersProvider: ContactsReducersProvider,
        private _contactsEffects: ContactsEffects,
        private _dispatcher: Dispatcher<IAction>
    ) {
        super({
            contacts: [],            
            contact: {},
            contactAddOrUpdateResponse: {},
            contactRemoveResponse: {},
            filter: {
                originalContacts:[],
                correlationId: null,
                contacts: [],
                value: "",
                mode: false
            }
        });
        this._dispatcher.subscribe(action => this.next(action));    
        this._reducers = _contactsReducersProvider.get();  
    }

    state;
    _reducers = [];

    next(action:IAction) {
        
        this.state = this.state || {
            contacts: [],
            contact: {},
            contactAddOrUpdateResponse: {},
            contactRemoveResponse: {},
            filter: {
                correlationId: null,
                contacts: [],
                value: "",
                mode: false
            }
        };
        
        for (let i = 0; i < this._reducers.length; i++) {
            this.state = this._reducers[i].call(null, this.state, action);
        }
        
        super.next(this.state);
    }

    dispatch = this._dispatcher.dispatch; 
}