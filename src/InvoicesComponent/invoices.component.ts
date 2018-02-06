import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from './invoices.service';
import { Event } from '@angular/router/src/events';

@Component({
    selector: 'invoices',
    templateUrl: 'invoices.component.html',
    styles: [require('./invoices.component.css').toString()],
    providers: [InvoicesService]
})

export class InvoicesComponent implements OnInit {

    items: any[];
    invoiceItem: any;
    sortO: number;
    sortF: string;

    constructor(private router: Router, private invServ: InvoicesService) { }

    ngOnInit() {
        this.sortO = 1;
        this.sortF = '';
        this.invServ.getTodos().subscribe(results => {
            this.items = results;
        });
    }

    changeSort(event) {
        this.sortF = event.field;
    }

    addItems() {
        this.items.push(this.invoiceItem);
    }

    back() {
        this.router.navigate(['početna']);
    }

}