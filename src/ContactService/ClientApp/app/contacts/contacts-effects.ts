import {Injectable} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Dispatcher} from "../shared/services/dispatcher";
import {contactsActions} from "./contacts.actions";

@Injectable()
export class ContactsEffects {
    constructor(
        private _contactsService: ContactsService,
        private _dispatcher: Dispatcher<any>
    ) { }

    public async scan(action) {
        if (action.type === contactsActions.CONTACT_GET) {
            const response = await this._contactsService.get();

            this._dispatcher.dispatch({
                type: contactsActions.CONTACTS_LOADED,
                payload: { response }
            });
        }
    }
}