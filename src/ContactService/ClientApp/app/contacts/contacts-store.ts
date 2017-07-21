import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Contact} from "./contact.model";
import {events,EventHub,IEvent} from "../shared/services/event-hub";

@Injectable()
export class ContactsActionCreator {
    public get() { }
    public save() { }
    public remove() { }
}

@Injectable()
export class ContactsStore {
    constructor() {
        this.contacts$ = new BehaviorSubject<Array<Contact>>([]);
    }

    public contacts$: BehaviorSubject<Array<Contact>>;
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