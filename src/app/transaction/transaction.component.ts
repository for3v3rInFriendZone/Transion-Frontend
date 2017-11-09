import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService} from './transaction.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService],
  encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit {

  clientId: string;
  transactions: any = [];

  /**
   * This is tab from table, to indicate if tab is clicked.
   */
  tab: any = {};

  /**
   * If data exists, show table, otherwise don't.
   */
  showTable: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, 
              private transactionSer: TransactionService,
              private router: Router) { }

  ngOnInit() {
    this.tab.all = true;

    this.activatedRoute.params
    .subscribe(
      params => {
        this.clientId = params['id'];
      });

    this.transactionSer.getTransactionsFromAgency(this.clientId, 'all')
    .subscribe(
      data => {
        this.transactions = data; 
        if(this.transactions.length != 0) {
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
  }

  back() {
    this.router.navigate(['clients']);
  }

  changeTab(tab: string) {
    if(tab == 'all') {
      this.tab.all = true;
      this.tab.notPaid = false;
      this.tab.paid = false;
      this.transactionSer.getTransactionsFromAgency(this.clientId, 'all')
      .subscribe(
        data => {
          this.transactions = data; 
          if(this.transactions.length != 0) {
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        });
    } else if(tab == 'notPaid') {
      this.transactionSer.getTransactionsFromAgency(this.clientId, 'notPaid')
      .subscribe(
        data => {
          this.transactions = data; 
          if(this.transactions.length != 0) {
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        });
      this.tab.all = false;
      this.tab.notPaid = true;
      this.tab.paid = false;
    } else {
      this.transactionSer.getTransactionsFromAgency(this.clientId, 'paid')
      .subscribe(
        data => {
          this.transactions = data; 
          if(this.transactions.length != 0) {
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        });
      this.tab.all = false;
      this.tab.notPaid = false;
      this.tab.paid = true;
    }
  }

}
