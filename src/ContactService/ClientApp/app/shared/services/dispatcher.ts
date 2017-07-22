import {Subject} from "rxjs/Subject";

export interface IAction {
    type: string;
    payload: any;
}

export class Dispatcher<IAction> extends Subject<IAction> {
    constructor() {
        super();
        this.dispatch = this.dispatch.bind(this);
    }
    
    dispatch(action: IAction) {
        return this.next(action);
    }
}