import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService} from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService],
})
export class TransactionComponent implements OnInit {

  agencyId: number;
  agency: any = {};
  transactions: any = [];

  constructor(private activatedRoute: ActivatedRoute, private transactionSer: TransactionService) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(
      params => {
        this.agencyId = params['id'];
      });

    this.transactionSer.getTransactionsFromAgency(this.agencyId)
    .subscribe(
      data => {
        this.agency = data;
        this.transactions = this.agency.transactions;
      });
  }

}
