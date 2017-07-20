import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login.component';

const declarables = [LoginComponent];
const providers = [];

@NgModule({
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class UsersModule { }
