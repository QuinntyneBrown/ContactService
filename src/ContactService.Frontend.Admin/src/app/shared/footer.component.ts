import { Router } from "../router";

const template = require("./footer.component.html");
const styles = require("./footer.component.scss");

export class FooterComponent extends HTMLElement {
    constructor(private _router: Router = Router.Instance, private _window:Window = window) {
        super();
    }

    static get observedAttributes () {
        return [];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
    }

    private _bind() {

    }

    private _addEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }
}

customElements.define(`ce-footer`,FooterComponent);
