﻿declare interface ActivatedRoute {
    name: string;
    params: any;
    authRequired: boolean;
    path: string;
    segments: Array<any>;
    routeParams: any;
}

declare interface RouteChangeOptions {
    currentView: HTMLElement;
    nextRouteName: string;
    previousRouteName: string;
    routeParams: any;
    cancelled: any;
    nextRoute?: ActivatedRoute;
}

declare var Quill;

declare var rome: any;

declare var moment: any;
