import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../shared/services/error.service";
import {Contact} from "./contact.model";

@Injectable()
export class ContactsService {
    constructor(private _httpClient: HttpClient, private _errorService: ErrorService) { }

    public addOrUpdate(options: {contact:any, correlationId?:string}) {
        this._httpClient
            .post(`${this._baseUrl}api/contacts/add`, { contact: options.contact, correlationId: options.correlationId })
            .catch(this._errorService.catchErrorResponse)
            .toPromise();
    }

    public get() {
        return this._httpClient
            .get<{ contacts: Array<Contact>}>(`${this._baseUrl}api/contacts/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }) {
        return this._httpClient
            .get<{contact: Contact}>(`${this._baseUrl}api/contacts/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse)
            .toPromise();
    }

    public remove(options: { contact: any, correlationId?: any }) {       
        this._httpClient
            .delete(`${this._baseUrl}api/contacts/remove?id=${options.contact.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse)
            .toPromise();
    }

    public get _baseUrl() { return "/"; }
}
