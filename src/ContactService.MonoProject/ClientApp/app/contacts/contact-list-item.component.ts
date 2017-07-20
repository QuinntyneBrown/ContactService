import {Component,Input,ViewEncapsulation,Output,EventEmitter} from "@angular/core";


@Component({
    templateUrl: "./contact-list-item.component.html",
    styleUrls: ["./contact-list-item.component.css"],
    selector: "ce-contact-list-item",
    encapsulation: ViewEncapsulation.Emulated
})
export class ContactListItemComponent {    
    @Input()
    public contact: any = {};
    
    @Output()
    public select: EventEmitter<any> = new EventEmitter();

    @Output()
    public delete: EventEmitter<any> = new EventEmitter();        
}
