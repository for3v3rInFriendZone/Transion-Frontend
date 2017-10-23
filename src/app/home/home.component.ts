import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

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

}
