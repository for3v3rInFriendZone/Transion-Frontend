import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MyErrorStateMatcher } from '../_services/InputErrorStateMatcher';
import { filter } from 'rxjs/operator/filter';

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
  emailFormControl: any;
  matcher: any;
  dataSource: any;
  userEmail: string;
  tableFlag: boolean;
  details: boolean;
  selectedRow: Number;
  newUserFlag: boolean;
  success: string;
  error: string;
  displayedColumns: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router, private userSer: UsersService) { }

  ngOnInit() {
    this.displayedColumns = ['firstname', 'lastname', 'username', 'email', 'telephone'];
    this.userEmail = JSON.parse(localStorage.getItem('currentUser')).username;
    this.generateUsers();
    this.selectedRow = -1;
    this.tableFlag = true;
    this.details = false;
    this.newUserFlag = false;
    this.success = null;
    this.error = null;
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.matcher = new MyErrorStateMatcher();
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
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        alert('Users could not be retrived.');
      });
  }

  showDetails(selectedImport: any) {
    this.user = selectedImport;
    this.selectedRow = selectedImport.id;
    this.details = true;
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
