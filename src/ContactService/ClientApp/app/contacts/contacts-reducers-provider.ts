import { Injectable } from "@angular/core";
import {contactsActions} from "./contacts.actions";

@Injectable()
export class ContactsReducersProvider {
    public get() {
        return [
            //contactsLoadedReducer,
            //contactSaveReducer,
            //contactRemoveReducer,
            //contactAddedOrUpdatedEventReducer,
            //contactDeletedEventReducer,
            contactsLoadedReducer,
            contactsEditReducer,
            contactsFilterReducer
        ];
    }
}

function contactSaveReducer(state: any, action: any) {
    return Object.assign({}, state);
}

function contactRemoveReducer(state: any, action: any) {
    return Object.assign({}, state);
}

function contactAddedOrUpdatedEventReducer(state: any, action: any) {
    return Object.assign({}, state);
}

function contactDeletedEventReducer(state: any, action: any) {
    return Object.assign({}, state);
}

function contactsLoadedReducer(state: any, action: any) {
    if (action.type === contactsActions.CONTACTS_LOADED) {        
        state.contacts = action.payload.response.contacts;
    }
    return Object.assign({}, state);
}

function contactsEditReducer(state: any, action: any) {
    if (action.type === contactsActions.CONTACT_EDIT) {
        state.contact = action.payload.contact
    }
    return Object.assign({}, state);
}

function contactsFilterReducer(state: any, action: any) {
    if (action.type === contactsActions.CONTACTS_FILTER_KEY_UP) {
        state.filter.correlationId = action.payload.correlationId;
        state.filter.value = action.payload.value;        
        state.filter.contacts = state.contacts.filter(contact => contact.email.indexOf(action.payload.value) > -1);      
        state.filter.mode = action.payload.value.length > 2;   
    }
    return Object.assign({}, state);
}