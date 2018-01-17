import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IssuedInvoiceBookService } from './issued-invoice-book.service';

@Component({
  selector: 'app-issued-invoice-book',
  templateUrl: './issued-invoice-book.component.html',
  styleUrls: ['./issued-invoice-book.component.css'],
  providers: [IssuedInvoiceBookService],
  encapsulation: ViewEncapsulation.None
})
export class IssuedInvoiceBookComponent implements OnInit {

  invoice: any = {};
  invoices: any = [];
  constructor(private router: Router, private iibs: IssuedInvoiceBookService) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['home']);
  }

}
