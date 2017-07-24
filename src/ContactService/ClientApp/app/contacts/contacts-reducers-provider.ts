﻿import { Injectable } from "@angular/core";
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
            contactsFilterReducer,
            contactAddedOrUpdated
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

function contactAddedOrUpdated(state: any, action: any) {
    if (action.type === contactsActions.ENTITY_ADDED_OR_UPDATED && action.payload.entityName.toLowerCase() === "contact") {        
        state.contactAddOrUpdateResponse = action.payload;
    }
    return Object.assign({}, state);
}

function contactRemoved(state: any, action: any) {
    if (action.type === contactsActions.ENTITY_REMOVED && action.payload.entityName.toLowerCase() === "contact") {
        state.contactRemoveResponse = action.payload;
    }
    return Object.assign({}, state);
}