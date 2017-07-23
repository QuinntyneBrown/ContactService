import {Component,Input, Output, EventEmitter} from "@angular/core";
import {toPageListFromInMemory,IPagedList} from "../shared/components/pager.component";
import {Observable} from "rxjs/Observable";

@Component({
    templateUrl: "./contact-paginated-list.component.html",
    styleUrls: [
        "../shared/styles/forms.css",
        "../shared/styles/list.css",
        "./contact-paginated-list.component.css"
    ],
    selector: "ce-contact-paginated-list"
})
export class ContactPaginatedListComponent { 

    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.filterKeyUp = new EventEmitter();
    }
    public setPageNumber($event) {
        this.pageNumber = $event.detail.pageNumber;
        this.pagedList = toPageListFromInMemory(this.contacts, this.pageNumber, this.pageSize);
    }
    private _contacts = [];

    public get contacts() {
        return this._contacts;
    }
    @Input("contacts")
    public set contacts(value) {
        this._contacts = value;
        this.pagedList = toPageListFromInMemory(this.contacts, this.pageNumber, this.pageSize);
    }

    public pagedList: IPagedList<any> = <any>{};

    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;

    
    @Output()
    public filterKeyUp: EventEmitter<any>;

    
    public pageNumber: number = 1;

    public pageSize: number = 5;    
}