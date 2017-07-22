import {Injectable} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Dispatcher} from "../shared/services/dispatcher";

@Injectable()
export class ContactsEffects {
    constructor(
        private _contactsService: ContactsService,
        private _dispatcher: Dispatcher<any>
    ) { }

    public scan(action) {

    }
}