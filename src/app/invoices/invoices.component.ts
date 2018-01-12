import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InvoicesService } from './invoices.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [InvoicesService],
  encapsulation: ViewEncapsulation.None
})
export class InvoicesComponent implements OnInit {

  invoice: any = {};
  dataSource: any = [];
  displayedColumns: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private importSer: InvoicesService) { }

  ngOnInit() {
   // this.dataSource = new MatTableDataSource(this.dataSource);
    this.displayedColumns = ['itemName', 'quantity', 'rebate', 'price'];
  }

  addInvoice() {
   // this.dataSource = [];
    this.invoice.fullPrice = this.invoice.quantity * this.invoice.price;
    this.dataSource.push(this.invoice);
   // this.dataSource = new MatTableDataSource(this.dataSource);
  }

  clearInputs() {
    this.invoice = {};
  }

}
