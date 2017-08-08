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
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {            
            this._contactsService.get().toPromise().then(x => {                
                this.unfilteredContacts = x.contacts;
                this.contacts = this.filterTerm != null ? this.filteredContacts : this.unfilteredContacts;                
                this._changeDetectorRef.detectChanges();                
            });
        });      
    }

    ngOnChanges() {
        console.log("changes");
    }

    public async ngOnInit() {
        this.unfilteredContacts = (await this._contactsService.get().toPromise()).contacts;   
        this.contacts = this.filterTerm != null ? this.filteredContacts : this.unfilteredContacts;       
    }

    public tryToDelete($event) {        
        this._contacts = pluckOut({
            items: this._contacts,
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
        this.contacts = this.filterTerm != null ? this.filteredContacts : this.unfilteredContacts;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _contacts: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public contacts: Array<any> = [];
    public unfilteredContacts: Array<any> = [];
    public get filteredContacts() {
        return this.unfilteredContacts.filter((x) => x.email.indexOf(this.filterTerm) > -1);
    }
}
