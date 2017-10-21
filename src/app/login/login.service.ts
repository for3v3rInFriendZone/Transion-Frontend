import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserLogin } from './user';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {

  constructor(private http:Http) { 
  }
    /*
    login() {
      return this.http.post('localhost:8080/user').map(
        (response) => response.json();
      ).subscribe(
        (data) => console.log(data);
      )
    } */

    getData() {
     /*
      this.http.get('http://localhost:8080/user',

      )
      .subscribe(
        data => {
          console.log(data.json())
        }); */
    }

    loginUser(user: UserLogin) {
      /*
      return this.http.post('http://localhost:8080/login', user, options)
      .subscribe(
        data => {
          console.log(data.json())
        },
        err => {
          console.error(err)
        });
        */
        console.log(user);
        return this.http.post('http://localhost:8080/login', user)
        .subscribe(
          resp => {
            console.log(resp.headers.get('authorization'))
          },
          err => {
            console.error(err)
          });
    }
}

