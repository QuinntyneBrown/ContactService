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
            contactsLoadedReducer
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