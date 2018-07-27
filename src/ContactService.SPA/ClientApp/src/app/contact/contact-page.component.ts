import { Component, ViewChild } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { AddContactOverlay } from "./add-contact-overlay";
import { ContactService } from "./contact.service";
import { takeUntil, tap } from "rxjs/operators";
import { IgxGridComponent } from "igniteui-angular";
import { Contact } from "./contact.model";

@Component({
  templateUrl: "./contact-page.component.html",
  styleUrls: ["./contact-page.component.css"],
  selector: "app-contact-page"
})
export class ContactPageComponent { 
  constructor(private _addContactOverlay: AddContactOverlay, private _contactService: ContactService) { }

  ngOnInit() {
    this._contactService.get()
      .pipe(takeUntil(this.onDestroy), tap(x => this.contacts$.next(x)))
      .subscribe();
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();    
  }
  columns: any[] = [
    {
      field: "firstname",
      header: "Firstname"
    }
  ];

  afterViewInit: boolean;

  ngAfterViewInit() {
    this.afterViewInit = true;
  }
  ngDoCheck() {
    if (this.grid && this.afterViewInit)
      this.grid.reflow();    
  }

  @ViewChild("grid")
  public grid: IgxGridComponent;

  public openOverlay() {
    this._addContactOverlay.create();
  }

  public contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject([]);
}
