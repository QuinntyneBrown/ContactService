import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {constants} from "../constants";
import {Storage } from "./storage.service";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";

declare var $: any;

export interface IEvent {
    type: string;
}

export const events = {
    ENTITY_ADDED_OR_UPDATED: "ENTITY_ADDED_OR_UPDATED",
    ENTITY_DELETED: "ENTITY_DELETED"
};

@Injectable()
export class EventHub {
    private _eventHubProxy: any;
    private _connection: any;

    constructor(private _storage: Storage) {
        this.events$ = new BehaviorSubject(null);
        this._connection = this._connection || $.hubConnection(constants.HUB_URL);
        this._connection.qs = { "Bearer": this._storage.get({ name: constants.ACCESS_TOKEN_KEY }) };        
        this._eventHubProxy = this._connection.createHubProxy("eventHub");
        this._eventHubProxy.on("events", this.events$.next);
        this._connection.start();
    }
    
    public events$: BehaviorSubject<any>;        
}