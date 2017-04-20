import { AccountAdd, AccountDelete, AccountEdit, accountActions } from "./account.actions";
import { Account } from "./account.model";
import { AccountService } from "./account.service";

const template = require("./account-master-detail.component.html");
const styles = require("./account-master-detail.component.scss");

export class AccountMasterDetailComponent extends HTMLElement {
    constructor(
        private _accountService: AccountService = AccountService.Instance	
	) {
        super();
        this.onAccountAdd = this.onAccountAdd.bind(this);
        this.onAccountEdit = this.onAccountEdit.bind(this);
        this.onAccountDelete = this.onAccountDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "accounts"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.accounts = await this._accountService.get();
        this.accountListElement.setAttribute("accounts", JSON.stringify(this.accounts));
    }

    private _setEventListeners() {
        this.addEventListener(accountActions.ADD, this.onAccountAdd);
        this.addEventListener(accountActions.EDIT, this.onAccountEdit);
        this.addEventListener(accountActions.DELETE, this.onAccountDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(accountActions.ADD, this.onAccountAdd);
        this.removeEventListener(accountActions.EDIT, this.onAccountEdit);
        this.removeEventListener(accountActions.DELETE, this.onAccountDelete);
    }

    public async onAccountAdd(e) {

        await this._accountService.add(e.detail.account);
        this.accounts = await this._accountService.get();
        
        this.accountListElement.setAttribute("accounts", JSON.stringify(this.accounts));
        this.accountEditElement.setAttribute("account", JSON.stringify(new Account()));
    }

    public onAccountEdit(e) {
        this.accountEditElement.setAttribute("account", JSON.stringify(e.detail.account));
    }

    public async onAccountDelete(e) {

        await this._accountService.remove(e.detail.account.id);
        this.accounts = await this._accountService.get();
        
        this.accountListElement.setAttribute("accounts", JSON.stringify(this.accounts));
        this.accountEditElement.setAttribute("account", JSON.stringify(new Account()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "accounts":
                this.accounts = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<Account> { return this.accounts; }

    private accounts: Array<Account> = [];
    public account: Account = <Account>{};
    public get accountEditElement(): HTMLElement { return this.querySelector("ce-account-edit-embed") as HTMLElement; }
    public get accountListElement(): HTMLElement { return this.querySelector("ce-account-list-embed") as HTMLElement; }
}

customElements.define(`ce-account-master-detail`,AccountMasterDetailComponent);
