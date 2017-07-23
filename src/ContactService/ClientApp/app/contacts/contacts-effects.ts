import {Injectable} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Dispatcher} from "../shared/services/dispatcher";
import {contactsActions} from "./contacts.actions";

@Injectable()
export class ContactsEffects {
    constructor(
        private _contactsService: ContactsService,
        private _dispatcher: Dispatcher<any>
    ) {
        this._dispatcher.subscribe(this.next);
    }

    public next(action) {
        if (action.type === contactsActions.CONTACT_GET) {
            this.get();
        }

        if (action.type === contactsActions.CONTACT_ADD_OR_UPDATE) {
            this.addOrUpdate({
                contact: action.payload.contact,
                correlationId: action.payload.correlationId
            });
        }

        if (action.type === contactsActions.CONTACT_REMOVE) {
            this.remove({
                contact: action.payload.contact,
                correlationId: action.payload.correlationId
            });
        }
    }

    public async get() {
        const response = await this._contactsService.get();

        this._dispatcher.dispatch({
            type: contactsActions.CONTACTS_LOADED,
            payload: { response }
        });
    }

    public async addOrUpdate(options) {
        const response = await this._contactsService.addOrUpdate({
            contact: options.contact,
            correlationId: options.correlationId
        });
    }

    public async remove(options) {
        const response = await this._contactsService.remove({
            contact: options.contact,
            correlationId: options.correlationId
        });
    }
}