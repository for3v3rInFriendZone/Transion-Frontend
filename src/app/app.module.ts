import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.routes';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { TokenService } from './_services/token.service';
import { AuthenticationService } from './_services/authentication.service';
import { AgenciesComponent } from './agencies/agencies.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FindClientComponent } from './find-client/find-client.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AgenciesComponent,
    UserComponent,
    TransactionComponent,
    FindClientComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService,
    multi: true
    },
    {provide: APP_BASE_HREF, useValue : '/'}, 
    AuthGuard,
    AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
