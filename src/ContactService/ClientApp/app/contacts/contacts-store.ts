import {Injectable, Inject} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Contact} from "./contact.model";
import {events,EventHub,IEvent} from "../shared/services/event-hub";
import {ContactsService} from "./contacts.service";
import {Dispatcher} from "../shared/services/dispatcher";
import {Storage} from "../shared/services/storage.service";
import {ContactsEffects} from "./contacts-effects";
import {ContactsReducersProvider} from "./contacts-reducers-provider";

@Injectable()
export class ContactsStore extends BehaviorSubject<any> {
    constructor(
        private _storage: Storage,
        private _contactsReducersProvider: ContactsReducersProvider,
        private _contactsEffects: ContactsEffects,
        private _dispatcher: Dispatcher<any>
    ) {
        super(window["contactsInitialState"]);
        this._dispatcher.subscribe(action => this.next(action));    
        this._reducers = _contactsReducersProvider.get();    
    }

    state;
    _reducers = [];

    next(action) {
        this.state = this.state || this._storage.get({ name: "contactsState" }) || {} as any;
        
        this._contactsEffects.scan(action);

        for (let i = 0; i < this._reducers.length; i++) {
            this.state = this._reducers[i].call(null, this.state, action);
        }
        this._storage.put({ name: "state", value: this.state });
        super.next(this.state);
    }

    dispatch = this._dispatcher.dispatch; 
}

function contactSaveReducer(action:any, state:any) {
    return Object.assign({},state);
}

function contactRemoveReducer(action: any, state: any) {
    return Object.assign({}, state);
}

function contactAddedOrUpdatedEventReducer(action: any, state: any) {
    return Object.assign({}, state);
}

function contactDeletedEventReducer(action: any, state: any) {
    return Object.assign({}, state);
}

function contactsLoadedReducer(action: any, state: any) {
    return Object.assign({}, state);
}