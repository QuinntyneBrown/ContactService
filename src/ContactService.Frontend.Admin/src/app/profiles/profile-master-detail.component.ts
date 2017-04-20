import { ProfileAdd, ProfileDelete, ProfileEdit, profileActions } from "./profile.actions";
import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";

const template = require("./profile-master-detail.component.html");
const styles = require("./profile-master-detail.component.scss");

export class ProfileMasterDetailComponent extends HTMLElement {
    constructor(
        private _profileService: ProfileService = ProfileService.Instance	
	) {
        super();
        this.onProfileAdd = this.onProfileAdd.bind(this);
        this.onProfileEdit = this.onProfileEdit.bind(this);
        this.onProfileDelete = this.onProfileDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "profiles"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.profiles = await this._profileService.get();
        this.profileListElement.setAttribute("profiles", JSON.stringify(this.profiles));
    }

    private _setEventListeners() {
        this.addEventListener(profileActions.ADD, this.onProfileAdd);
        this.addEventListener(profileActions.EDIT, this.onProfileEdit);
        this.addEventListener(profileActions.DELETE, this.onProfileDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(profileActions.ADD, this.onProfileAdd);
        this.removeEventListener(profileActions.EDIT, this.onProfileEdit);
        this.removeEventListener(profileActions.DELETE, this.onProfileDelete);
    }

    public async onProfileAdd(e) {

        await this._profileService.add(e.detail.profile);
        this.profiles = await this._profileService.get();
        
        this.profileListElement.setAttribute("profiles", JSON.stringify(this.profiles));
        this.profileEditElement.setAttribute("profile", JSON.stringify(new Profile()));
    }

    public onProfileEdit(e) {
        this.profileEditElement.setAttribute("profile", JSON.stringify(e.detail.profile));
    }

    public async onProfileDelete(e) {

        await this._profileService.remove(e.detail.profile.id);
        this.profiles = await this._profileService.get();
        
        this.profileListElement.setAttribute("profiles", JSON.stringify(this.profiles));
        this.profileEditElement.setAttribute("profile", JSON.stringify(new Profile()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "profiles":
                this.profiles = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<Profile> { return this.profiles; }

    private profiles: Array<Profile> = [];
    public profile: Profile = <Profile>{};
    public get profileEditElement(): HTMLElement { return this.querySelector("ce-profile-edit-embed") as HTMLElement; }
    public get profileListElement(): HTMLElement { return this.querySelector("ce-profile-list-embed") as HTMLElement; }
}

customElements.define(`ce-profile-master-detail`,ProfileMasterDetailComponent);
