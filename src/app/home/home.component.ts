import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  model: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
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
    this.router.navigate(['fakture']);
  }

  showUsers() {
    this.router.navigate(['admin/users']);
  }

  showListAllClients() {
    this.router.navigate(['clients']);
  }

  showMappings() {
    this.router.navigate(['admin/mapping']);
  }

  showKIR() {
    this.router.navigate(['kir']);
  }

  showItems() {
    this.router.navigate(['artikli']);
  }
}
