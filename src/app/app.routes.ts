import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AgenciesComponent } from './agencies/agencies.component';
import { UserComponent} from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UsersComponent } from './users/users.component';
import { MappingComponent } from './mapping/mapping.component';
import { ImportComponent } from './import/import.component';
import { InvoicesComponent } from './invoices/invoices.component';  
import { IssuedInvoiceBookComponent } from './issued-invoice-book/issued-invoice-book.component';
import { ItemComponent } from './item/item.component';    

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: LoginComponent},
    { path: 'clients', component: AgenciesComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
 //   { path: 'client/:id', component: TransactionComponent, canActivate: [AuthGuard]},
    { path: 'client/invoices', component: InvoicesComponent, canActivate: [AuthGuard]},
    { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard]},
    { path: 'admin/mapping', component: MappingComponent, canActivate: [AuthGuard]},
    { path: 'import', component: ImportComponent, canActivate: [AuthGuard]},
    { path: 'kir', component: IssuedInvoiceBookComponent, canActivate: [AuthGuard]},
    { path: 'artikli', component: ItemComponent, canActivate: [AuthGuard]},

    { path: '**', redirectTo: 'home'}
];

export const Routing = RouterModule.forRoot(routes);