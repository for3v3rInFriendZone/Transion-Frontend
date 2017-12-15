import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
  encapsulation: ViewEncapsulation.None
})

export class UserComponent implements OnInit {

  username: string;
  error: string;
  success: string;
  user: any = {};

  constructor(private router: Router, private userSer: UserService) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;

    this.userSer.getUserByUsername(this.username)
    .subscribe(
      data => {
        this.user = data;
      });
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  saveUser() {
    this.userSer.saveUser(this.user)
    .subscribe(
      data => {
        console.log(data);
        this.success = 'User has been saved.';
        setTimeout(()=>{  
          this.router.navigate(['home']);
        },1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      });
  }

}
