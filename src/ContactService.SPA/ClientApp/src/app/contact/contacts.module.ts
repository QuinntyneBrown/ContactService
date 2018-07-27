import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ContactPageComponent } from './contact-page.component';
import { AddContactOverlayComponent } from './add-contact-overlay.component';
import { ContactEditorComponent } from './contact-editor.component';
import { AddContactOverlay } from './add-contact-overlay';
import { ContactService } from './contact.service';

const declarations = [
  ContactPageComponent,
  AddContactOverlayComponent,
  ContactEditorComponent
];

const entryComponents = [
  AddContactOverlayComponent
];

const providers = [
  AddContactOverlay,
  ContactService
];

@NgModule({
  declarations,
  entryComponents,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    CoreModule,
    SharedModule	
  ],
  providers,
})
export class ContactsModule { }
