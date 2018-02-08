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

    items: any;
    invoiceItems: any;
    invoiceItem: any;
    selectedItem: any;
    newItemFlag: boolean;
    displayDialog: boolean;
    sortO: number;
    sortF: string;

    constructor(private router: Router, private invServ: InvoicesService) { }

    ngOnInit() {
        this.newItemFlag = false;
        this.displayDialog = false;
        this.invoiceItems = [];
        this.items = [];
        this.sortO = 1;
        this.sortF = '';
    }

    changeSort(event) {
        this.sortF = event.field;
    }

    showAddDialog() {
        this.newItemFlag = true;
        this.invoiceItem = {};
        this.displayDialog = true;
    }

    save() {
        let invoiceItems = [...this.invoiceItems];
        if (this.newItemFlag)
            invoiceItems.push(this.invoiceItem);
        else
            invoiceItems[this.findSelectedItemIndex()] = this.invoiceItem;

        this.invoiceItems = invoiceItems;
        this.invoiceItem = null;
        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedItemIndex();
        this.invoiceItems = this.invoiceItems.filter((val, i) => i != index);
        this.invoiceItem = null;
        this.displayDialog = false;
    }

    onRowSelect(event: any) {
        this.newItemFlag = false;
        this.invoiceItem = this.cloneInvoiceItem(event.data);
        this.displayDialog = true;
    }

    cloneInvoiceItem(item: any): any {
        let invItem = {};
        for (let prop in item) {
            invItem[prop] = item[prop];
        }
        return invItem;
    }

    findSelectedItemIndex(): number {
        return this.invoiceItems.indexOf(this.selectedItem);
    }

    filterItemSingle(event: any) {
        let query = event.query;
        this.invServ.getItems()
        .subscribe( items => {
            this.items = this.filterItem(query, items);
        });
    }

    filterItem(query, items: any):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            if(item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        return filtered;
    }

    back() {
        this.router.navigate(['početna']);
    }




}