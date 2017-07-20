import {
    Component,
    Input,
    OnInit,
    EventEmitter,
    Output,
    AfterViewInit,
    AfterContentInit,
    Renderer,
    ElementRef,
} from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    templateUrl: "./contact-edit.component.html",
    styleUrls: [
        "../shared/styles/forms.css",
        "./contact-edit.component.css"],
    selector: "ce-contact-edit"
})
export class ContactEditComponent {
    constructor() {
        this.tryToSave = new EventEmitter();
    }

    ngAfterContentInit() {
        this.form.patchValue({
            email: this.contact.email,
            firstName: this.contact.firstName,
            lastName: this.contact.lastName,
            streetAddress: this.contact.streetAddress,
            city: this.contact.city,
            phoneNumber: this.contact.phoneNumber
        });
    }

    @Output()
    public tryToSave: EventEmitter<any>;

    @Input()
    public contact: any = {};

    public form = new FormGroup({
        email: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        streetAddress: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
    });
}
