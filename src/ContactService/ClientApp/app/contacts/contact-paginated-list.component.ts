import {Component,Input,Output,EventEmitter} from "@angular/core";
import {toPageListFromInMemory,IPagedList} from "../shared/components/pager.component";

@Component({
    templateUrl: "./contact-paginated-list.component.html",
    styleUrls: [
        "../shared/styles/list.css",
        "./contact-paginated-list.component.css"
    ],
    selector: "ce-contact-paginated-list"
})
export class ContactPaginatedListComponent {    
    public setPageNumber($event) {
        this.pageNumber = $event.detail.pageNumber;
        this.pagedList = toPageListFromInMemory(this.contacts, this.pageNumber, this.pageSize);
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
    }

    pagedList: IPagedList<any>;
    pageSize: number = 5;
    pageNumber: number = 1;
    _contacts: Array<any> = [];

    public get contacts() { return this._contacts; }

    @Input("contacts")
    public set contacts(value) {
        this._contacts = value;
        this.pagedList = toPageListFromInMemory(this.contacts, this.pageNumber, this.pageSize);
    }

    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;
}