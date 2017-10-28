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
    this.ping();
  }

  public ping() {
    this.http.get('http://localhost:8080/user')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  showAgencies() {
    this.model.agencies = true;
    this.model.imports = false;
    this.model.exports = false;
  }

  showImports() {
    this.model.imports = true;
    this.model.agencies = false;
    this.model.exports = false;
  }

  showExports() {
    this.model.exports = true;
    this.model.imports = false;
    this.model.agencies = false;
  }

  showListAllAgencies() {
    this.router.navigate(['agencies']);
  }


}
