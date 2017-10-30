import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AgenciesComponent } from './agencies/agencies.component';
import { UserComponent} from './user/user.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: LoginComponent},
    { path: 'agencies', component: AgenciesComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},

    { path: '**', redirectTo: 'home'}
];

export const Routing = RouterModule.forRoot(routes);