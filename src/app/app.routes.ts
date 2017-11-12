import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AgenciesComponent } from './agencies/agencies.component';
import { UserComponent} from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FindClientComponent } from './find-client/find-client.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: LoginComponent},
    { path: 'clients', component: AgenciesComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'client/:id', component: TransactionComponent, canActivate: [AuthGuard]},
    { path: 'find/client', component: FindClientComponent, canActivate: [AuthGuard]},
    { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard]},

    { path: '**', redirectTo: 'home'}
];

export const Routing = RouterModule.forRoot(routes);