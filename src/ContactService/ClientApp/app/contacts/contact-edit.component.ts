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

    @Output()
    public tryToSave: EventEmitter<any>;

    private _contact: any = {};

    @Input("contact")
    public set contact(value) {
        this._contact = value;

        this.form.patchValue({
            email: this._contact.email,
            firstName: this._contact.firstName,
            lastName: this._contact.lastName,
            streetAddress: this._contact.streetAddress,
            city: this._contact.city,
            phoneNumber: this._contact.phoneNumber
        });
    }
   
    public form = new FormGroup({
        email: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        streetAddress: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
    });
}
