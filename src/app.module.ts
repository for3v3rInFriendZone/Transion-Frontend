import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/datatable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService as AuthGuard } from './AuthGuardService/auth-guard.service';
import { AuthService } from './AuthService/auth.service';
import { GrowlModule } from 'primeng/growl';

import { routes } from "./app.routes";

import { RootComponent } from "./RootComponent/root.component";
import { ListComponent } from "./ListComponent/list.component";
import { LoginComponent } from "./LoginComponent/login.component";
import { FooterComponent } from "./FooterComponent/footer.component";
import { HeaderComponent } from "./HeaderComponent/header.component";
import { HomeComponent } from "./HomeComponent/home.component";
import { InvoicesComponent } from "./InvoicesComponent/invoices.component";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), 
              HttpModule, BrowserAnimationsModule, ButtonModule, ChartModule, InputTextModule,
              DataTableModule, AutoCompleteModule, DialogModule, HttpClientModule, GrowlModule,
              JwtModule.forRoot({
                config: {
                  tokenGetter: () => {
                    return JSON.parse(localStorage.getItem('currentUser')).token;
                  },
                  whitelistedDomains: ['localhost:8080']
                }
              })

    ],
    declarations: [RootComponent, ListComponent, LoginComponent, 
                   FooterComponent, HeaderComponent, HomeComponent, InvoicesComponent
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue : '/'},
        AuthGuard, 
        AuthService
    ],
    bootstrap: [RootComponent]
})
export class AppModule { }