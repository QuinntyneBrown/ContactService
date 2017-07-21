import { Component, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

@Component({
    templateUrl: "./contact-list.component.html",
    styleUrls: [
        "../shared/styles/list.css",
        "./contact-list.component.css"
    ],
    selector: "ce-contact-list"
})
export class ContactListComponent {
    @Input()
    public contacts: Array<any> = [];

    @Output()
    public edit: EventEmitter<any> = new EventEmitter();

    @Output()
    public delete: EventEmitter<any> = new EventEmitter();
}
