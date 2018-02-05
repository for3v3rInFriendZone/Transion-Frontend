import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import { RootComponent } from "./root.component";
import { ListComponent } from "./ListComponent/list.component";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, BrowserAnimationsModule, ButtonModule, ChartModule],
    declarations: [RootComponent, ListComponent],
    bootstrap: [RootComponent]
})
export class AppModule { }