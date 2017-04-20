import { Account } from "./account.model";

const template = require("./account-list-embed.component.html");
const styles = require("./account-list-embed.component.scss");

export class AccountListEmbedComponent extends HTMLElement {
    constructor(
        private _document: Document = document
    ) {
        super();
    }


    static get observedAttributes() {
        return [
            "accounts"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
    }

    private async _bind() {        
        for (let i = 0; i < this.accounts.length; i++) {
            let el = this._document.createElement(`ce-account-item-embed`);
            el.setAttribute("entity", JSON.stringify(this.accounts[i]));
            this.appendChild(el);
        }    
    }

    accounts:Array<Account> = [];

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "accounts":
                this.accounts = JSON.parse(newValue);
                if (this.parentElement)
                    this.connectedCallback();
                break;
        }
    }
}

customElements.define("ce-account-list-embed", AccountListEmbedComponent);
