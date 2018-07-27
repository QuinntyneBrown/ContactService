import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MasterPageComponent } from './master-page.component';
import { ContactPageComponent } from './contact/contact-page.component';


export const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: ContactPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
