import { Profile } from "./profile.model";
import { EditorComponent } from "../shared";
import {  ProfileDelete, ProfileEdit, ProfileAdd } from "./profile.actions";

const template = require("./profile-edit-embed.component.html");
const styles = require("./profile-edit-embed.component.scss");

export class ProfileEditEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    static get observedAttributes() {
        return [
            "profile",
            "profile-id"
        ];
    }
    
    connectedCallback() {        
        this.innerHTML = `<style>${styles}</style> ${template}`; 
        this._bind();
        this._setEventListeners();
    }
    
    private async _bind() {
        this._titleElement.textContent = this.profile ? "Edit Profile": "Create Profile";

        if (this.profile) {                
            this._nameInputElement.value = this.profile.name;  
        } else {
            this._deleteButtonElement.style.display = "none";
        }     
    }

    private _setEventListeners() {
        this._saveButtonElement.addEventListener("click", this.onSave);
        this._deleteButtonElement.addEventListener("click", this.onDelete);
    }

    private disconnectedCallback() {
        this._saveButtonElement.removeEventListener("click", this.onSave);
        this._deleteButtonElement.removeEventListener("click", this.onDelete);
    }

    public onSave() {
        const profile = {
            id: this.profile != null ? this.profile.id : null,
            name: this._nameInputElement.value
        } as Profile;
        
        this.dispatchEvent(new ProfileAdd(profile));            
    }

    public onDelete() {        
        const profile = {
            id: this.profile != null ? this.profile.id : null,
            name: this._nameInputElement.value
        } as Profile;

        this.dispatchEvent(new ProfileDelete(profile));         
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "profile-id":
                this.profileId = newValue;
                break;
            case "profile":
                this.profile = JSON.parse(newValue);
                if (this.parentNode) {
                    this.profileId = this.profile.id;
                    this._nameInputElement.value = this.profile.name != undefined ? this.profile.name : "";
                    this._titleElement.textContent = this.profileId ? "Edit Profile" : "Create Profile";
                }
                break;
        }           
    }

    public profileId: any;
    public profile: Profile;
    
    private get _titleElement(): HTMLElement { return this.querySelector("h2") as HTMLElement; }
    private get _saveButtonElement(): HTMLElement { return this.querySelector(".save-button") as HTMLElement };
    private get _deleteButtonElement(): HTMLElement { return this.querySelector(".delete-button") as HTMLElement };
    private get _nameInputElement(): HTMLInputElement { return this.querySelector(".profile-name") as HTMLInputElement;}
}

customElements.define(`ce-profile-edit-embed`,ProfileEditEmbedComponent);
