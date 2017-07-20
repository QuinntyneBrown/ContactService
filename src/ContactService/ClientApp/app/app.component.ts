import {Component} from "@angular/core";
import {Storage} from "./shared/services/storage.service";
import {constants} from "./shared/constants";
import {Observable} from "rxjs/Observable";

@Component({
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    selector: "app"
})
export class AppComponent {
    constructor(private _storage: Storage) {        
        this.isAuthenticated$ = this._storage.items$.asObservable()
            .map(x => {
                const accessToken = this._storage.get({ name: constants.ACCESS_TOKEN_KEY });
                return accessToken != null && accessToken != "null";
            }); 
    }
    
    public isAuthenticated$: Observable<any>;
}
