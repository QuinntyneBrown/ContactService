import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ContactsService {
    constructor(private _httpClient: HttpClient) { }

    public addOrUpdate(options: {contact:any, correlationId?:string}) {
        this._httpClient
            .post(`${this._baseUrl}api/contacts/add`, { contact: options.contact, correlationId: options.correlationId })
            .toPromise();
    }

    public get() {
        return this._httpClient
            .get<any>(`${this._baseUrl}api/contacts/get`);
    }

    public getById(options: { id: number }) {
        return this._httpClient
            .get<any>(`${this._baseUrl}api/contacts/getById?id=${options.id}`)
            .toPromise();
    }

    public remove(options: { contact: any, correlationId?: any }) {       
        this._httpClient
            .delete(`${this._baseUrl}api/contacts/remove?id=${options.contact.id}&correlationId=${options.correlationId}`)
            .toPromise();
    }

    public get _baseUrl() { return "/"; }
}
