import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InvoicesService } from './invoices.service';
import { ItemService } from '../item/item.service';
import { DataSource } from '@angular/cdk/collections';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [InvoicesService, ItemService],
  encapsulation: ViewEncapsulation.None
})
export class InvoicesComponent implements OnInit {

  invoice: any = {};
  item: any = {};
  items: any = [];
  dataSource: any = [];
  displayedColumns: any = [];
  sumOfInvoices: number;
  sumOfPdv: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private importSer: InvoicesService, private itemSer: ItemService) { }

  ngOnInit() {
    this.getAllItems();
    this.item.externalUniqueKey = new Date().getTime() + '/2018';
    this.displayedColumns = ['itemName', 'quantity', 'rebate', 'price'];
    this.sumOfInvoices = 0;
    this.sumOfPdv = 0;
  }

  getAllItems() {
    this.itemSer.getAll()
    .subscribe(
      data => {
        this.items = data;
    });
  }

  /**
   * Add items to invoice
   */
  addItem() {
    debugger;
    this.item.afterRebate = this.item.sellingPrice - this.item.rebate;
    if(this.item.rebate > 0) {
      this.item.base = this.item.quantity * this.item.afterRebate;
      this.item.pdvValue = this.item.tax.base / 100 * this.item.afterRebate;
      this.item.pdvValueFull = this.item.tax.base / 100 * this.item.afterRebate * this.item.quantity;
      
    } else {
      this.item.base = this.item.quantity * this.item.sellingPrice;
      this.item.pdvValue = this.item.tax.base / 100 * this.item.sellingPrice;
      this.item.pdvValueFull = this.item.tax.base / 100 * this.item.sellingPrice * this.item.quantity;
    }
    this.item.fullPrice = this.item.base + this.item.pdvValueFull;

    this.sumOfInvoices = this.sumOfInvoices + this.item.base;
    this.sumOfPdv = this.sumOfPdv + this.item.pdvValueFull;
    this.dataSource.push(this.item);
    this.item = {};
  }

  clearInputs() {
    this.item = {};
  }

  back() {
    this.router.navigate(['home']);
  }

}
