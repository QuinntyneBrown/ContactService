import { Component, QueryList, ContentChildren, Inject, forwardRef, ElementRef } from '@angular/core';

export const UPDATE_ACTIVE_TAB:string = "[Tabs] UPDATE_ACTIVE_TAB";

class UpdateActiveTabEvent extends CustomEvent {
    constructor(tabTitle: TabTitleComponent) {
        super(UPDATE_ACTIVE_TAB, {
            bubbles: true,
            cancelable:true,
            composed: true,
            detail: {tabTitle}
        } as CustomEventInit);
    }
}

@Component({
    templateUrl: "./tab-title.component.html",
    styleUrls:["./tab-title.component.css"],
    selector: "ce-tab-title",
    host: { '(click)': 'updateActiveTab()', '[class.is-active]': 'active', 'class': 'tabs__tab' },
})
export class TabTitleComponent {
    constructor(public elementRef: ElementRef) { }

    active: boolean = false;
    
    updateActiveTab() {  
        (this.elementRef.nativeElement as HTMLElement).dispatchEvent(new UpdateActiveTabEvent(this));
    }

    activate() { this.active = true; }

    deactivate() { this.active = false; }
}
