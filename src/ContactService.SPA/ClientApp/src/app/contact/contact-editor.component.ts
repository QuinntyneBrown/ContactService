import { Component } from "@angular/core";
import { Subject } from "rxjs";

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
}
