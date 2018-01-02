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
  tableFlag: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.tableFlag = false;
  }

  showClients() {
    this.tableFlag = false;
    this.model.clients = true;
    this.model.imports = false;
    this.model.exports = false;
    this.model.conf = false;
  }

  showImports() {
    this.tableFlag = false;
    this.model.imports = true;
    this.model.clients = false;
    this.model.exports = false;
    this.model.conf = false;
  }

  showExports() {
    this.tableFlag = false;
    this.model.exports = true;
    this.model.imports = false;
    this.model.clients = false;
    this.model.conf = false;
  }

  showConf() {
    this.tableFlag = false;
    this.model.exports = false;
    this.model.imports = false;
    this.model.clients = false;
    this.model.conf = true;
  }

  showUsers() {
    this.router.navigate(['admin/users']);
  }

  showListAllClients() {
    this.router.navigate(['clients']);
  }

  findClient() {
    this.router.navigate(['find/client']);
  }

  showMappings() {
    this.router.navigate(['admin/mapping']);
  }

  
  showListOfImports() {
   // this.router.navigate(['import']);
    this.tableFlag = true;
  }
  
}
