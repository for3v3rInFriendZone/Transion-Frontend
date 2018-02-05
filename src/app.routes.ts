import { Routes } from "@angular/router";

import { ListComponent } from "./ListComponent/list.component";
import { LoginComponent } from "./LoginComponent/login.component";

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'list', component: ListComponent },

    { path: '**', redirectTo: ''}
]