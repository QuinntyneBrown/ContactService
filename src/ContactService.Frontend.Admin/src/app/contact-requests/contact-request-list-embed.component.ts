import { ContactRequest } from "./contact-request.model";

const template = require("./contact-request-list-embed.component.html");
const styles = require("./contact-request-list-embed.component.scss");

export class ContactRequestListEmbedComponent extends HTMLElement {
    constructor(
        private _document: Document = document
    ) {
        super();
    }


    static get observedAttributes() {
        return [
            "contact-requests"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
    }

    private async _bind() {        
        for (let i = 0; i < this.contactRequests.length; i++) {
            let el = this._document.createElement(`ce-contact-request-item-embed`);
            el.setAttribute("entity", JSON.stringify(this.contactRequests[i]));
            this.appendChild(el);
        }    
    }

    contactRequests:Array<ContactRequest> = [];

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "contact-requests":
                this.contactRequests = JSON.parse(newValue);
                if (this.parentElement)
                    this.connectedCallback();
                break;
        }
    }
}

customElements.define("ce-contact-request-list-embed", ContactRequestListEmbedComponent);
