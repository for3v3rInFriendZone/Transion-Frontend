import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tr-header',
  templateUrl: './header.component.html',
  styles: [require('./header.component.css').toString()]
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }   

  ngOnInit() {
   // this.userEmail = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  logout() {
    this.router.navigate(['']);
  }

}
