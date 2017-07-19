import { Contact } from "./contact.model";

export const contactActions = {
    ADD: "[Contact] Add",
    EDIT: "[Contact] Edit",
    DELETE: "[Contact] Delete",
    CONTACTS_CHANGED: "[Contact] Contacts Changed"
};

export class ContactEvent extends CustomEvent {
    constructor(eventName:string, contact: Contact) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { contact }
        } as CustomEventInit);
    }
}

export class ContactAdd extends ContactEvent {
    constructor(contact: Contact) {
        super(contactActions.ADD, contact);        
    }
}

export class ContactEdit extends ContactEvent {
    constructor(contact: Contact) {
        super(contactActions.EDIT, contact);
    }
}

export class ContactDelete extends ContactEvent {
    constructor(contact: Contact) {
        super(contactActions.DELETE, contact);
    }
}

export class ContactsChanged extends CustomEvent {
    constructor(contacts: Array<Contact>) {
        super(contactActions.CONTACTS_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { contacts }
        });
    }
}
