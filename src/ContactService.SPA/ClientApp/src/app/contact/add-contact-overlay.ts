import { Injectable, ComponentRef, Injector } from "@angular/core";
import { OverlayRefWrapper } from "../core/overlay-ref-wrapper";
import { PortalInjector, ComponentPortal } from "@angular/cdk/portal";
import { AddContactOverlayComponent } from "./add-contact-overlay.component";
import { OverlayRefProvider } from "../core/overlay-ref-provider";
import { Observable } from "rxjs";

@Injectable()
export class AddContactOverlay {
  constructor(
    public _injector: Injector,
    public _overlayRefProvider: OverlayRefProvider
  ) { }

  public create(options: { contactId?: string } = {}): Observable<any> {
    const overlayRef = this._overlayRefProvider.create();
    const overlayRefWrapper = new OverlayRefWrapper(overlayRef);
    const overlayComponent = this.attachOverlayContainer(overlayRef, overlayRefWrapper);
    overlayComponent.contactId = options.contactId;
    return overlayRefWrapper.afterClosed();
  }

  public attachOverlayContainer(overlayRef, overlayRefWrapper) {
    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRefWrapper, overlayRefWrapper);
    const injector = new PortalInjector(this._injector, injectionTokens);
    const overlayPortal = new ComponentPortal(AddContactOverlayComponent, null, injector);
    const overlayPortalRef: ComponentRef<AddContactOverlayComponent> = overlayRef.attach(overlayPortal);
    return overlayPortalRef.instance;
  }
}
