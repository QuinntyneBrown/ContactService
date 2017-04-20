import { ContactRequest } from "./contact-request.model";
import { EditorComponent } from "../shared";
import {  ContactRequestDelete, ContactRequestEdit, ContactRequestAdd } from "./contact-request.actions";

const template = require("./contact-request-edit-embed.component.html");
const styles = require("./contact-request-edit-embed.component.scss");

export class ContactRequestEditEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    static get observedAttributes() {
        return [
            "contact-request",
            "contact-request-id"
        ];
    }
    
    connectedCallback() {        
        this.innerHTML = `<style>${styles}</style> ${template}`; 
        this._bind();
        this._setEventListeners();
    }
    
    private async _bind() {
        this.descriptionEditor = new EditorComponent(this._descriptionInputElement);

        this._titleElement.textContent = this.contactRequest ? "Edit Contact Request": "Create Contact Request";

        if (this.contactRequest) {                
            this._nameInputElement.value = this.contactRequest.name != undefined ? this.contactRequest.name : "";
            this._emailInputElement.value = this.contactRequest.email != undefined ? this.contactRequest.email : "";
            this.descriptionEditor.setHTML(this.contactRequest.description != undefined ? this.contactRequest.description : "");  
        } else {
            this._deleteButtonElement.style.display = "none";
        }     
    }

    private _setEventListeners() {
        this._saveButtonElement.addEventListener("click", this.onSave);
        this._deleteButtonElement.addEventListener("click", this.onDelete);
        this._createButtonElement.addEventListener("click", this.onCreate);
    }

    private disconnectedCallback() {
        this._saveButtonElement.removeEventListener("click", this.onSave);
        this._deleteButtonElement.removeEventListener("click", this.onDelete);
        this._createButtonElement.removeEventListener("click", this.onCreate);
    }

    public onSave() {
        const contactRequest = {
            id: this.contactRequest != null ? this.contactRequest.id : null,
            name: this._nameInputElement.value,
            email: this._emailInputElement.value,
            description: this.descriptionEditor.text
        } as ContactRequest;
        
        this.dispatchEvent(new ContactRequestAdd(contactRequest));            
    }

    public onCreate() {        
        this.dispatchEvent(new ContactRequestEdit(new ContactRequest()));            
    }

    public onDelete() {        
        const contactRequest = {
            id: this.contactRequest != null ? this.contactRequest.id : null,
            name: this._nameInputElement.value
        } as ContactRequest;

        this.dispatchEvent(new ContactRequestDelete(contactRequest));         
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "contact-request-id":
                this.contactRequestId = newValue;
                break;
            case "contact-request":
                this.contactRequest = JSON.parse(newValue);
                if (this.parentNode) {
                    this.contactRequestId = this.contactRequest.id;
                    this._nameInputElement.value = this.contactRequest.name != undefined ? this.contactRequest.name : "";
                    this._emailInputElement.value = this.contactRequest.email != undefined ? this.contactRequest.email : "";
                    this.descriptionEditor.setHTML(this.contactRequest.description != undefined ? this.contactRequest.description : "");
                    this._titleElement.textContent = this.contactRequestId ? "Edit Contact Request" : "Create Contact Request";
                }
                break;
        }           
    }

    public contactRequestId: any;
    
    public contactRequest: ContactRequest;

    public descriptionEditor: EditorComponent;
    
    private get _createButtonElement(): HTMLElement { return this.querySelector(".contact-request-create") as HTMLElement; }
    
	private get _titleElement(): HTMLElement { return this.querySelector("h2") as HTMLElement; }
    
	private get _saveButtonElement(): HTMLElement { return this.querySelector(".save-button") as HTMLElement };
    
	private get _deleteButtonElement(): HTMLElement { return this.querySelector(".delete-button") as HTMLElement };
    
    private get _nameInputElement(): HTMLInputElement { return this.querySelector(".contact-request-name") as HTMLInputElement; }

    private get _emailInputElement(): HTMLInputElement { return this.querySelector(".contact-request-email") as HTMLInputElement; }

    private get _descriptionInputElement(): HTMLInputElement { return this.querySelector(".contact-request-description") as HTMLInputElement; }
}

customElements.define(`ce-contact-request-edit-embed`,ContactRequestEditEmbedComponent);
