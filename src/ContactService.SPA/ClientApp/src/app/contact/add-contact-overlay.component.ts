import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { OverlayRefWrapper } from "../core/overlay-ref-wrapper";
import { ContactService } from "./contact.service";
import { Contact } from "./contact.model";
import { map, switchMap, tap, takeUntil } from "rxjs/operators";

@Component({
  templateUrl: "./add-contact-overlay.component.html",
  styleUrls: ["./add-contact-overlay.component.css"],
  selector: "app-add-contact-overlay",
  host: { 'class': 'mat-typography' }
})
export class AddContactOverlayComponent { 
  constructor(
    private _contactService: ContactService,
    private _overlay: OverlayRefWrapper) { }

  ngOnInit() {
    if (this.contactId)
      this._contactService.getById({ contactId: this.contactId })
        .pipe(
          map(x => this.contact$.next(x)),
          switchMap(x => this.contact$)
        )
        .subscribe();
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }

  public contact$: BehaviorSubject<Contact> = new BehaviorSubject(<Contact>{});
  
  public contactId: string;

  public handleCancelClick() {
    this._overlay.close();
  }

  public handleSaveClick($event) {

    this._contactService.create({ contact: $event.contact })
      .pipe(
        map(x => $event.contact.contactId = x.contactId),
        tap(x => this._overlay.close($event.contact)),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }
} 
