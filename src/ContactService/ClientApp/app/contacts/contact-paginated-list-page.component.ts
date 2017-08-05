import {Component} from "@angular/core";
import {ContactsService} from "./contacts.service";

@Component({
    templateUrl: "./contact-paginated-list-page.component.html",
    styleUrls: ["./contact-paginated-list-page.component.css"],
    selector: "ce-contact-paginated-list-page"   
})
export class ContactPaginatedListPageComponent {
    constructor(private _contactsService: ContactsService) { }

    public async ngOnInit() {
        this.contacts = await this._contactsService.get()
    }

    public tryToDelete($event) {

    }

    public tryToEdit($event) {

    }

    public handleContactsFilterKeyUp($event) {

    }

    public contacts: Array<any> = [];
}
