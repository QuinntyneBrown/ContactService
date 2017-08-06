import { Injectable } from "@angular/core";
import { CanLoad } from '@angular/router';
import { Storage } from "../services/storage.service";
import { constants } from "../constants";
import { EventHub } from "../services/event-hub";

@Injectable()
export class EventHubConnectionGuardService implements CanLoad {
    constructor(
        private _eventHub: EventHub,
        private _storage: Storage
    ) { }

    public canLoad(): Promise<boolean> {
        return this._eventHub.connect();
    }
}