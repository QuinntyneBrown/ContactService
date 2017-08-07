import {Component, ChangeDetectorRef} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";

@Component({
    templateUrl: "./contact-paginated-list-page.component.html",
    styleUrls: ["./contact-paginated-list-page.component.css"],
    selector: "ce-contact-paginated-list-page"   
})
export class ContactPaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsService: ContactsService,
        private _eventHub: EventHub,
        private _router: Router
    ) { }

    public async ngOnInit() {
        this.contacts = (await this._contactsService.get()).contacts;  

        this.subscription = this._eventHub.events.subscribe(x => {            
            this._contactsService.get().then(x => {
                this.contacts = x.contacts;
                this._changeDetectorRef.detectChanges();
            });
        });      
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public contacts: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;
}
