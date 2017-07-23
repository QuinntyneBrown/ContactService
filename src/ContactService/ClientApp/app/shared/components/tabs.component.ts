import { Component, QueryList, ContentChildren, Inject, forwardRef, AfterContentInit, ElementRef, OnInit } from '@angular/core';
import { TabTitleComponent, UPDATE_ACTIVE_TAB } from "./tab-title.component";
import { TabContentComponent } from "./tab-content.component";

@Component({
    selector: 'ce-tabs',
    host: { 'class': 'tabs' },
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements AfterContentInit, OnInit {
    constructor(private _elementRef: ElementRef) {
        this.updateActiveTabByTitle = this.updateActiveTabByTitle.bind(this);
    }

    @ContentChildren(TabTitleComponent)
    titles: QueryList<TabTitleComponent>;

    @ContentChildren(TabContentComponent)
    contents: QueryList<TabContentComponent>;

    activeTitle: any = null;

    ngOnInit() {
        this._elementRef.nativeElement.addEventListener(UPDATE_ACTIVE_TAB, this.updateActiveTabByTitle);
    }

    ngAfterContentInit() {
        this.updateActiveTabByTitle({ detail: { tabTitle: this.titles.first } });

        this.titles.changes.subscribe(x => {
            this.updateActiveTabByTitle({ detail: { tabTitle: this.titles.first } });
        });
    }

    updateActiveTabByTitle($event: { detail: { tabTitle: TabTitleComponent } }) {
        this.updateActiveTab((titleArr) => titleArr.indexOf($event.detail.tabTitle));
    }

    nextTab() {
        this.updateActiveTab((titleArr, lastIndex) => (lastIndex + 1) % titleArr.length);
    }

    private updateActiveTab(nextActiveIndexCb: (titleArr: any[], lastIndex: number) => number) {
        var titleArr = toArray(this.titles);
        var contentArr = toArray(this.contents);
        var lastIndex = titleArr.indexOf(this.activeTitle);
        var nextIndex = nextActiveIndexCb(titleArr, lastIndex);
        this.activeTitle = titleArr[nextIndex];

        if (lastIndex !== -1) {
            titleArr[lastIndex].deactivate();
            contentArr[lastIndex].deactivate();
        }
        titleArr[nextIndex].activate();
        contentArr[nextIndex].activate();
    }
}

function toArray<T>(query: QueryList<T>): T[] { // won't be needed in the next alpha
    var result = [];
    query.map(value => result.push(value));
    return result;
}