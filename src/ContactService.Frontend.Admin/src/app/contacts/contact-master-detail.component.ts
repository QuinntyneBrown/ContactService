import { ContactAdd, ContactDelete, ContactEdit, contactActions } from "./contact.actions";
import { Contact } from "./contact.model";
import { ContactService } from "./contact.service";

const template = require("./contact-master-detail.component.html");
const styles = require("./contact-master-detail.component.css");

export class ContactMasterDetailComponent extends HTMLElement {
    constructor(
        private _contactService: ContactService = ContactService.Instance	
	) {
        super();
        this.onContactAdd = this.onContactAdd.bind(this);
        this.onContactEdit = this.onContactEdit.bind(this);
        this.onContactDelete = this.onContactDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "contacts"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.contacts = await this._contactService.get();
        this.contactListElement.setAttribute("contacts", JSON.stringify(this.contacts));
    }

    private _setEventListeners() {
        this.addEventListener(contactActions.ADD, this.onContactAdd);
        this.addEventListener(contactActions.EDIT, this.onContactEdit);
        this.addEventListener(contactActions.DELETE, this.onContactDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(contactActions.ADD, this.onContactAdd);
        this.removeEventListener(contactActions.EDIT, this.onContactEdit);
        this.removeEventListener(contactActions.DELETE, this.onContactDelete);
    }

    public async onContactAdd(e) {

        await this._contactService.add(e.detail.contact);
        this.contacts = await this._contactService.get();
        
        this.contactListElement.setAttribute("contacts", JSON.stringify(this.contacts));
        this.contactEditElement.setAttribute("contact", JSON.stringify(new Contact()));
    }

    public onContactEdit(e) {
        this.contactEditElement.setAttribute("contact", JSON.stringify(e.detail.contact));
    }

    public async onContactDelete(e) {

        await this._contactService.remove(e.detail.contact.id);
        this.contacts = await this._contactService.get();
        
        this.contactListElement.setAttribute("contacts", JSON.stringify(this.contacts));
        this.contactEditElement.setAttribute("contact", JSON.stringify(new Contact()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "contacts":
                this.contacts = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<Contact> { return this.contacts; }

    private contacts: Array<Contact> = [];
    public contact: Contact = <Contact>{};
    public get contactEditElement(): HTMLElement { return this.querySelector("ce-contact-edit-embed") as HTMLElement; }
    public get contactListElement(): HTMLElement { return this.querySelector("ce-contact-paginated-list-embed") as HTMLElement; }
}

customElements.define(`ce-contact-master-detail`,ContactMasterDetailComponent);
