import {Component} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {EventHub, events, IEvent} from "../shared/services/event-hub";

@Component({
    templateUrl: "./contact-master-detail.component.html",
    styleUrls: ["./contact-master-detail.component.css"],
    selector: "ce-contact-master-detail"
})
export class ContactMasterDetailComponent {
    constructor(private _contactsService: ContactsService,
        private _eventHub: EventHub
    ) { }

    async ngOnInit() {
        var response = await this._contactsService.get();
        this.contacts = response.contacts;
        
        this._eventHub.events$.subscribe(this.handleEvent);
    }

    public handleEvent($event: IEvent) {

        if (!$event)
            return;

        if ($event.type === events.ENTITY_ADDED_OR_UPDATED) {

        }

        if ($event.type === events.ENTITY_DELETED) {

        }
    }

    async tryToSave($event) {
        await this._contactsService.add({ contact: $event.detail.contact });
    }

    async tryToDelete($event) {        
        await this._contactsService.remove({ contact: $event.detail.contact });        
    }

    async tryToEdit($event) {
        this.contact = $event.detail.contact;
    }

    contacts: Array<any> = [];
    contact: any = {};
}
