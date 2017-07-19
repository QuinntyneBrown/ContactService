import {fetch} from "../utilities";
import {Contact} from "./contact.model";
import {environment} from "../environment";

export class ContactService {
    constructor(private _fetch = fetch) { }

    private static _instance: ContactService;

    public static get Instance() {
        this._instance = this._instance || new ContactService();
        return this._instance;
    }

    public get(): Promise<Array<Contact>> {
        return this._fetch({ url: `${environment.baseUrl}api/contacts/get`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { contacts: Array<Contact> }).contacts;
        });
    }

    public getById(id): Promise<Contact> {
        return this._fetch({ url: `${environment.baseUrl}api/contacts/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { contact: Contact }).contact;
        });
    }

    public add(contact) {
        return this._fetch({ url: `${environment.baseUrl}api/contacts/add`, method: `POST`, data: { contact }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `${environment.baseUrl}api/contacts/remove?id=${options.id}`, method: `DELETE`, authRequired: true  });
    }
    
}
