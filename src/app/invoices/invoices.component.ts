import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InvoicesService } from './invoices.service';
import { ItemService } from '../item/item.service';
import { DataSource } from '@angular/cdk/collections';
import { UserService } from '../user/user.service'; 
import { DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [InvoicesService, ItemService, UserService],
  encapsulation: ViewEncapsulation.None
})
export class InvoicesComponent implements OnInit {

  invoice: any = {};
  clients: any = [];
  item: any = {};
  invoiceItem: any = {};
  items: any = [];
  user: any = {};
  dataSource: any = [];
  displayedColumns: any = [];
  sumOfInvoices: number;
  sumOfPdv: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private invoiceSer: InvoicesService, private itemSer: ItemService,
              private userSer: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllItems();
    this.getClients();
    this.getClientFromUser();
    this.invoice.externalUniqueKey = new Date().getTime() + '/2018';
    this.invoiceItem.item = {};
    this.invoice.invoiceItems = [];
    this.invoice.amountWithoutTax = 0;
    this.invoice.taxAmount = 0;
    this.invoice.amount = 0;
  }

  getClients() {
    this.invoiceSer.getClients()
    .subscribe(
      data => {
        this.clients = data;
      });
  }

  getClientFromUser() {
    this.userSer.getUserByUsername(JSON.parse(localStorage.getItem('currentUser')).username)
    .subscribe(
      data => {
        this.user = data;
        this.invoice.seller = this.user.client;
        this.invoice.createdBy = this.user;
      });
  }

  getAllItems() {
    this.itemSer.getAllItemsByClient(JSON.parse(localStorage.getItem('currentUser')).username)
    .subscribe(
      data => {
        this.items = data;
    });
  }

  /**
   * Add items to invoice
   */
  addItem() {
    this.invoiceItem.afterRebate = this.invoiceItem.item.sellingPrice - this.invoiceItem.rebate;
    if(this.invoiceItem.rebate > 0) {
      this.invoiceItem.price = this.invoiceItem.quantity * this.invoiceItem.afterRebate;
      this.invoiceItem.taxPrice = this.invoiceItem.item.tax.base / 100 * this.invoiceItem.afterRebate;
      this.invoiceItem.taxAmount = this.invoiceItem.item.tax.base / 100 * this.invoiceItem.afterRebate * this.invoiceItem.quantity;
      
    } else {
      this.invoiceItem.price = this.invoiceItem.quantity * this.invoiceItem.item.sellingPrice;
      this.invoiceItem.taxPrice = this.invoiceItem.item.tax.base / 100 * this.invoiceItem.item.sellingPrice;
      this.invoiceItem.taxAmount = this.invoiceItem.item.tax.base / 100 * this.invoiceItem.item.sellingPrice * this.invoiceItem.quantity;
    }
    this.invoiceItem.amount = this.invoiceItem.price + this.invoiceItem.taxAmount;

    this.invoice.amountWithoutTax =  this.invoice.amount +  this.invoiceItem.price;
    this.invoice.taxAmount = this.invoice.taxAmount + this.invoiceItem.taxAmount;
    this.invoice.amount = this.invoice.amountWithoutTax +  this.invoice.taxAmount;
    this.invoice.invoiceItems.push(this.invoiceItem);
    this.invoiceItem = {};
    this.invoiceItem.item = {};
  }

  clearInputs() {
    this.item = {};
  }

  back() {
    this.router.navigate(['home']);
  }

  saveInvoice() {
    this.invoiceSer.saveInvoice(this.invoice)
    .subscribe(
      data => {
        this.snackBar.open('Uspešno dodata faktura: ', this.invoice.externalUniqueKey, {
          duration: 2000,
        });
        setTimeout(() => { 
          this.router.navigate(['home']); 
        }, 2000);
      },
      err => {
        console.log('Error', err.error.message);
      });
  }

}
