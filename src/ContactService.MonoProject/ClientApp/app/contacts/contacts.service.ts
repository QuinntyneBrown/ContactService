import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import {SecuredHttpService} from "../shared/services/http.service";


@Injectable()
export class ContactsService {
    constructor(private _http: SecuredHttpService) { }

    public add(options: {contact:any}) {
        return this._http
            .post(`${this._baseUrl}/api/contacts/add`, { contact: options.contact });
    }

    public get() {
        return this._http
            .get(`${this._baseUrl}/api/contacts/get`);
    }

    //public getById(options: { id: number }) {
    //    return this._http
    //        .get(`${this._baseUrl}/api/contacts/getById?id=${options.id}`)
    //        .map(data => data.json())
    //        .catch(err => {
    //            return Observable.of(false);
    //        });
    //}

    public remove(options: { contact: any }) {
        return this._http
            .delete(`${this._baseUrl}/api/contacts/remove?id=${options.contact.id}`)            
    }

    public get _baseUrl() { return ""; }
}
