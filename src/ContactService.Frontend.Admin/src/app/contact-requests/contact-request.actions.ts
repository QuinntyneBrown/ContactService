import { ContactRequest } from "./contact-request.model";

export const contactRequestActions = {
    ADD: "[ContactRequest] Add",
    EDIT: "[ContactRequest] Edit",
    DELETE: "[ContactRequest] Delete",
    CONTACT_REQUESTS_CHANGED: "[ContactRequest] ContactRequests Changed"
};

export class ContactRequestEvent extends CustomEvent {
    constructor(eventName:string, contactRequest: ContactRequest) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            detail: { contactRequest }
        });
    }
}

export class ContactRequestAdd extends ContactRequestEvent {
    constructor(contactRequest: ContactRequest) {
        super(contactRequestActions.ADD, contactRequest);        
    }
}

export class ContactRequestEdit extends ContactRequestEvent {
    constructor(contactRequest: ContactRequest) {
        super(contactRequestActions.EDIT, contactRequest);
    }
}

export class ContactRequestDelete extends ContactRequestEvent {
    constructor(contactRequest: ContactRequest) {
        super(contactRequestActions.DELETE, contactRequest);
    }
}

export class ContactRequestsChanged extends CustomEvent {
    constructor(contactRequests: Array<ContactRequest>) {
        super(contactRequestActions.CONTACT_REQUESTS_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { contactRequests }
        });
    }
}
