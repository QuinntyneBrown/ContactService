import {Component} from "@angular/core";
import {Storage} from "./shared/services/storage.service";
import {constants} from "./shared/constants";
import {Observable} from "rxjs/Observable";
import {Router, NavigationStart} from "@angular/router";
import {EventHub} from "./shared/services/event-hub";

@Component({
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    selector: "app"
})
export class AppComponent {
    constructor(private _storage: Storage, private _router: Router, private _eventHub: EventHub) {
        this._router.events.subscribe(x => {
            if (x instanceof NavigationStart && x.url =="/login") {
                this._storage.put({ name: constants.ACCESS_TOKEN_KEY, value: null });                
            }
            const accessToken = this._storage.get({ name: constants.ACCESS_TOKEN_KEY });
            this.isAuthenticated =  accessToken != null && accessToken != "null";
        });

        //this._eventHub.events.subscribe(x => console.log(x));       
    }
    
    public isAuthenticated:boolean;
}