import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  userEmail: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  userDetails() {
    this.router.navigate(['user']);
  }

  logout() {
    this.router.navigate(['']);
  }

  homePage() {
    this.router.navigate(['home']);
  }

}
