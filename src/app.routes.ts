import { Routes } from "@angular/router";

import { ListComponent } from "./ListComponent/list.component";
import { LoginComponent } from "./LoginComponent/login.component";
import { HomeComponent } from "./HomeComponent/home.component";
import { InvoicesComponent } from "./InvoicesComponent/invoices.component";
import { AuthGuardService as AuthGuard } from './AuthGuardService/auth-guard.service';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'početna', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'faktura', component: InvoicesComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: 'početna'}
]