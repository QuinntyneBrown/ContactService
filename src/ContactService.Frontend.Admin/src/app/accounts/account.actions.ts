import { Account } from "./account.model";

export const accountActions = {
    ADD: "[Account] Add",
    EDIT: "[Account] Edit",
    DELETE: "[Account] Delete",
    ACCOUNTS_CHANGED: "[Account] Accounts Changed"
};

export class AccountEvent extends CustomEvent {
    constructor(eventName:string, account: Account) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            detail: { account }
        });
    }
}

export class AccountAdd extends AccountEvent {
    constructor(account: Account) {
        super(accountActions.ADD, account);        
    }
}

export class AccountEdit extends AccountEvent {
    constructor(account: Account) {
        super(accountActions.EDIT, account);
    }
}

export class AccountDelete extends AccountEvent {
    constructor(account: Account) {
        super(accountActions.DELETE, account);
    }
}

export class AccountsChanged extends CustomEvent {
    constructor(accounts: Array<Account>) {
        super(accountActions.ACCOUNTS_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { accounts }
        });
    }
}
