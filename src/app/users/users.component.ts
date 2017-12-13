import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users: any = [];
  user: any = {};
  userEmail: string;
  tableFlag: boolean;
  details: boolean;
  selectedRow: Number;
  newUserFlag: boolean;
  success: string;
  error: string;
  pageEvent: PageEvent;

  constructor(private router:Router, private userSer: UsersService) { }

  ngOnInit() {
    this.selectedRow = -1;
    this.tableFlag = true;
    this.details = false;
    this.newUserFlag = false;
    this.userEmail = JSON.parse(localStorage.getItem('currentUser')).username;
    this.success = null;
    this.error = null;

    this.generateUsers();
  }

  back() {
    if(this.tableFlag) {
      this.router.navigate(['home']);
    } else if(this.newUserFlag) {
      this.newUserFlag = false;
      this.tableFlag = true;
    }
  }

  generateUsers() {
    this.userSer.getUsers(this.userEmail)
    .subscribe(
      data => {
        this.users = data;
      },
      err => {
        alert('Users could not be retrived.');
      });
  }
  
  showDetails(user: any, index: Number) {
    this.user = user;
    this.details = true;
    this.selectedRow = index;
  }

  newUser() {
    this.user = {};
    this.newUserFlag = true;
    this.tableFlag = false;
    this.selectedRow = -1;
    this.details = false;
  }

  editUser() {
    this.newUserFlag = true;
    this.tableFlag = false;
  }

  removeUser(){
    this.userSer.deleteUser(this.user.id)
    .subscribe(
      data => {
        this.success = 'User has been successfully removed.';
        setTimeout(() => {  
          this.users.splice(this.selectedRow, 1);
          this.selectedRow = -1; //return to default state.
          this.success = null; //removes info message
        }, 1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      });
  }

  saveUser() {
    this.userSer.saveUser(this.user)
    .subscribe(
      data => {
        this.success = 'User has been saved.';
        setTimeout(() => {  
          this.newUserFlag = false;
          this.tableFlag = true;
          this.ngOnInit();
        }, 1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      });
  }

}
