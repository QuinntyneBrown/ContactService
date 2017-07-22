import {Subject} from "rxjs/Subject";

export class Dispatcher<T> extends Subject<T> {
    constructor() {
        super();
        this.dispatch = this.dispatch.bind(this);
    }
    
    dispatch(action) {
        return this.next(action);
    }
}