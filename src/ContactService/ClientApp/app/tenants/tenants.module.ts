import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { SetTenantFormComponent } from "./set-tenant-form.component";

const declarables = [SetTenantFormComponent];
const providers = [];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class TenantsModule { }
