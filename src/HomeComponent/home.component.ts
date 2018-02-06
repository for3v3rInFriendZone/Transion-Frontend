import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styles: [require('./home.component.css').toString()]
})

export class HomeComponent implements OnInit {
    model: any;

    constructor(private router: Router) { }

    ngOnInit() {
        this.model = {};
    }

    showClients() {
        this.model.clients = true;
        this.model.bookKeeping = false;
        this.model.conf = false;
    }

    showBookKeeping() {
        this.model.bookKeeping = true;
        this.model.clients = false;
        this.model.conf = false;
    }

    showConf() {
        this.model.conf = true;
        this.model.bookKeeping = false;
        this.model.clients = false;
    }

    showInvoices() {
        this.router.navigate(['faktura']);
    }

}