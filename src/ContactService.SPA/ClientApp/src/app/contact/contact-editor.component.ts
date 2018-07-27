import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { Contact } from "./contact.model";

@Component({
  templateUrl: "./contact-editor.component.html",
  styleUrls: ["./contact-editor.component.css"],
  selector: "app-contact-editor"
})
export class ContactEditorComponent { 

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
  
  public get contact() {
    const contact = new Contact();
    contact.contactId = this.form.value.contactId;
    contact.firstname = this.form.value.firstname;
    return contact;
  }

  @Input("Contact")
  public set contact(value: Contact) {
    this.form.patchValue({
      contactId: value.contactId,
      firstname: value.firstname,
      lastname: value.lastname,
      companyName: value.companyName,
      email: value.email
    });
  }

  @Output()
  public save: EventEmitter<any> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<any> = new EventEmitter();

  public form: FormGroup = new FormGroup({
    contactId: new FormControl(null,[]),
    firstname: new FormControl(null, []),
    lastname: new FormControl(null, []),
    companyName: new FormControl(null, []),
    email: new FormControl(null, [])
  });
}
