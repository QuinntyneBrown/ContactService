import {Component} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";

@Component({
    templateUrl: "./contact-paginated-list-page.component.html",
    styleUrls: ["./contact-paginated-list-page.component.css"],
    selector: "ce-contact-paginated-list-page"   
})
export class ContactPaginatedListPageComponent {
    constructor(
        private _contactsService: ContactsService,
        private _router: Router
    ) { }

    public async ngOnInit() {
        this.contacts = (await this._contactsService.get()).contacts;        
    }

    public tryToDelete($event) {        
        this.contacts = pluckOut({
            items: this.contacts,
            value: $event.detail.contact.id
        });
        this._contactsService.remove({ contact: $event.detail.contact });
    }

    public tryToEdit($event) {
        this._router.navigate(["contacts", $event.detail.contact.id]);
    }

    public handleContactsFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
    }

    public contacts: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;
}
