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
    this.model.imports = false;
    this.model.exports = false;
  }

  showImports() {
    this.model.imports = true;
    this.model.clients = false;
    this.model.exports = false;
  }

  showExports() {
    this.model.exports = true;
    this.model.imports = false;
    this.model.clients = false;
  }

  showListAllClients() {
    this.router.navigate(['clients']);
  }

  findClient() {
    this.router.navigate(['find/client']);
  }


}
