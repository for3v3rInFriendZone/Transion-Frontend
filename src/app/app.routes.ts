import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', component: LoginComponent}
];

export const Routing = RouterModule.forRoot(routes);