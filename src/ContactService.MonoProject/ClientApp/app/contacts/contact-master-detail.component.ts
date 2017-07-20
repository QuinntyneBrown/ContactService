import {Component} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {EventHub} from "../shared/services/event-hub";

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

    public handleEvent($event) {
        alert(JSON.stringify($event));
    }

    async tryToSave($event) {
        await this._contactsService.add({ contact: $event.detail.contact });
    }

    async tryToDelete($event) {        
        await this._contactsService.remove({ contact: $event.detail.contact });        
    }

    contacts: Array<any> = [];
}
