import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import { routes } from "./app.routes";

import { RootComponent } from "./RootComponent/root.component";
import { ListComponent } from "./ListComponent/list.component";
import { LoginComponent } from "./LoginComponent/login.component";
import { FooterComponent } from "./FooterComponent/footer.component";
import { HeaderComponent } from "./HeaderComponent/header.component";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), 
              HttpModule, BrowserAnimationsModule, ButtonModule, ChartModule
    ],
    declarations: [RootComponent, ListComponent, LoginComponent, FooterComponent, HeaderComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue : '/'},
    ],
    bootstrap: [RootComponent]
})
export class AppModule { }