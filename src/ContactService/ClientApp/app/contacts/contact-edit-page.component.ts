import {Component} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";

@Component({
    templateUrl: "./contact-edit-page.component.html",
    styleUrls: ["./contact-edit-page.component.css"],
    selector: "ce-contact-edit-page"
})
export class ContactEditPageComponent {
    constructor(private _contactsService: ContactsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.contact = (await this._contactsService.getById({ id: this._activatedRoute.snapshot.params["id"] })).contact;
        }
    }

    public tryToSave($event) {
        const correlationId = guid();
        this._contactsService.addOrUpdate({ contact: $event.detail.contact, correlationId });
        this._router.navigateByUrl("/contacts");
    }

    public contact = {};
}
