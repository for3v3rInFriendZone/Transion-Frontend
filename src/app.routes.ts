import { Routes } from "@angular/router";

import { ListComponent } from "./ListComponent/list.component";
import { LoginComponent } from "./LoginComponent/login.component";
import { HomeComponent } from "./HomeComponent/home.component";
import { InvoicesComponent } from "./InvoicesComponent/invoices.component";

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'početna', component: HomeComponent },
    { path: 'faktura', component: InvoicesComponent },

    { path: '**', redirectTo: 'početna'}
]