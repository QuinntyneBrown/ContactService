import { fetch } from "../utilities";
import { ContactRequest } from "./contact-request.model";

export class ContactRequestService {
    constructor(private _fetch = fetch) { }

    private static _instance: ContactRequestService;

    public static get Instance() {
        this._instance = this._instance || new ContactRequestService();
        return this._instance;
    }

    public get(): Promise<Array<ContactRequest>> {
        return this._fetch({ url: "/api/contactrequest/get", authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { contactRequests: Array<ContactRequest> }).contactRequests;
        });
    }

    public getById(id): Promise<ContactRequest> {
        return this._fetch({ url: `/api/contactrequest/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { contactRequest: ContactRequest }).contactRequest;
        });
    }

    public add(contactRequest) {
        return this._fetch({ url: `/api/contactrequest/add`, method: "POST", data: { contactRequest }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `/api/contactrequest/remove?id=${options.id}`, method: "DELETE", authRequired: true  });
    }
    
}
