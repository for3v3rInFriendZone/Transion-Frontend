import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from './invoices.service';

@Component({
    selector: 'invoices',
    templateUrl: 'invoices.component.html',
    styles: [require('./invoices.component.css').toString()],
    providers: [InvoicesService]
})

export class InvoicesComponent implements OnInit {

    items: any[];
    invoiceItem: any;

    constructor(private router: Router, private invServ: InvoicesService) { }

    ngOnInit() {
        this.invServ.getTodos().subscribe(results => {
            this.items = results;
        });
    }

    addItems() {
        this.items.push(this.invoiceItem);
    }

    back() {
        this.router.navigate(['početna']);
    }

}