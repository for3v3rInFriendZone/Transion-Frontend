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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent
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