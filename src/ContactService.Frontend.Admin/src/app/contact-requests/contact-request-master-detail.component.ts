import { ContactRequestAdd, ContactRequestDelete, ContactRequestEdit, contactRequestActions } from "./contact-request.actions";
import { ContactRequest } from "./contact-request.model";
import { ContactRequestService } from "./contact-request.service";

const template = require("./contact-request-master-detail.component.html");
const styles = require("./contact-request-master-detail.component.scss");

export class ContactRequestMasterDetailComponent extends HTMLElement {
    constructor(
        private _contactRequestService: ContactRequestService = ContactRequestService.Instance	
	) {
        super();
        this.onContactRequestAdd = this.onContactRequestAdd.bind(this);
        this.onContactRequestEdit = this.onContactRequestEdit.bind(this);
        this.onContactRequestDelete = this.onContactRequestDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "contact-requests"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.contactRequests = await this._contactRequestService.get();
        this.contactRequestListElement.setAttribute("contact-requests", JSON.stringify(this.contactRequests));
    }

    private _setEventListeners() {
        this.addEventListener(contactRequestActions.ADD, this.onContactRequestAdd);
        this.addEventListener(contactRequestActions.EDIT, this.onContactRequestEdit);
        this.addEventListener(contactRequestActions.DELETE, this.onContactRequestDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(contactRequestActions.ADD, this.onContactRequestAdd);
        this.removeEventListener(contactRequestActions.EDIT, this.onContactRequestEdit);
        this.removeEventListener(contactRequestActions.DELETE, this.onContactRequestDelete);
    }

    public async onContactRequestAdd(e) {

        await this._contactRequestService.add(e.detail.contactRequest);
        this.contactRequests = await this._contactRequestService.get();
        
        this.contactRequestListElement.setAttribute("contact-requests", JSON.stringify(this.contactRequests));
        this.contactRequestEditElement.setAttribute("contact-request", JSON.stringify(new ContactRequest()));
    }

    public onContactRequestEdit(e) {
        this.contactRequestEditElement.setAttribute("contact-request", JSON.stringify(e.detail.contactRequest));
    }

    public async onContactRequestDelete(e) {

        await this._contactRequestService.remove(e.detail.contactRequest.id);
        this.contactRequests = await this._contactRequestService.get();
        
        this.contactRequestListElement.setAttribute("contact-requests", JSON.stringify(this.contactRequests));
        this.contactRequestEditElement.setAttribute("contact-request", JSON.stringify(new ContactRequest()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "contact-requests":
                this.contactRequests = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<ContactRequest> { return this.contactRequests; }

    private contactRequests: Array<ContactRequest> = [];
    public contactRequest: ContactRequest = <ContactRequest>{};
    public get contactRequestEditElement(): HTMLElement { return this.querySelector("ce-contact-request-edit-embed") as HTMLElement; }
    public get contactRequestListElement(): HTMLElement { return this.querySelector("ce-contact-request-list-embed") as HTMLElement; }
}

customElements.define(`ce-contact-request-master-detail`,ContactRequestMasterDetailComponent);
