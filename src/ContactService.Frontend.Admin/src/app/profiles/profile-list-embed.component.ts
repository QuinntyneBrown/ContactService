import { Profile } from "./profile.model";

const template = require("./profile-list-embed.component.html");
const styles = require("./profile-list-embed.component.scss");

export class ProfileListEmbedComponent extends HTMLElement {
    constructor(
        private _document: Document = document
    ) {
        super();
    }


    static get observedAttributes() {
        return [
            "profiles"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
    }

    private async _bind() {        
        for (let i = 0; i < this.profiles.length; i++) {
            let el = this._document.createElement(`ce-profile-item-embed`);
            el.setAttribute("entity", JSON.stringify(this.profiles[i]));
            this.appendChild(el);
        }    
    }

    profiles:Array<Profile> = [];

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "profiles":
                this.profiles = JSON.parse(newValue);
                if (this.parentElement)
                    this.connectedCallback();
                break;
        }
    }
}

customElements.define("ce-profile-list-embed", ProfileListEmbedComponent);
