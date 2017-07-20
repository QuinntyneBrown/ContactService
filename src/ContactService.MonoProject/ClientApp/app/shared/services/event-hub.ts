import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {constants} from "../constants";
import {Storage } from "./storage.service";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";

declare var $: any;

@Injectable()
export class EventHub {
    private _hubs: any = {};
    private _connection: any;
    private _connectionStarted: boolean;

    constructor(private _storage: Storage) {
        this.events$ = new BehaviorSubject(null);

        this._connection = this._connection || $.hubConnection(constants.HUB_URL);
        this._connection.qs = { "Bearer": this._storage.get({ name: constants.ACCESS_TOKEN_KEY }) };        
        this._hubs.eventHub = this._connection.createHubProxy("eventHub");

        this._hubs.eventHub.on("events", (value) => {
            this.events$.next(value);
        });

        this._connection.start().done(() => {

        });
    }
    
    public events$: BehaviorSubject<any>;        
}