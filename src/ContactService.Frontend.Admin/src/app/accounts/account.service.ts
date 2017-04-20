import { fetch } from "../utilities";
import { Account } from "./account.model";

export class AccountService {
    constructor(private _fetch = fetch) { }

    private static _instance: AccountService;

    public static get Instance() {
        this._instance = this._instance || new AccountService();
        return this._instance;
    }

    public get(): Promise<Array<Account>> {
        return this._fetch({ url: "/api/account/get", authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { accounts: Array<Account> }).accounts;
        });
    }

    public getById(id): Promise<Account> {
        return this._fetch({ url: `/api/account/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { account: Account }).account;
        });
    }

    public add(account) {
        return this._fetch({ url: `/api/account/add`, method: "POST", data: { account }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `/api/account/remove?id=${options.id}`, method: "DELETE", authRequired: true  });
    }
    
}
