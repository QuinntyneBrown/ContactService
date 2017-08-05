import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {constants} from "../constants";
import {Storage} from "./storage.service";
import {Dispatcher} from "./dispatcher";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";

declare var $: any;

enum connectionState {
    connecting,
    connected,
    disconnected
}

@Injectable()
export class EventHub {
    private _eventHubProxy: any;
    private _connection: any;
    private _connectionState: connectionState = connectionState.disconnected;
    private _connectingPromise: Promise<any>;
    constructor(private _storage: Storage, private _dispatcher: Dispatcher<any>) { } 

    public connect() {
        if (this._connectingPromise)
            return this._connectingPromise;

        this._connectingPromise = new Promise((resolve) => {
            if (this._connectionState === connectionState.disconnected) {
                this._connection = this._connection || $.hubConnection(constants.HUB_URL);
                this._connection.qs = { "Bearer": this._storage.get({ name: constants.ACCESS_TOKEN_KEY }) };
                this._eventHubProxy = this._connection.createHubProxy("eventHub");
                this._eventHubProxy.on("events", this._dispatcher.dispatch);
                this._connection.start().done(() => {
                    resolve();
                    this._connectingPromise = null;
                });
            } else {
                resolve();
            }
        });
    }       
}