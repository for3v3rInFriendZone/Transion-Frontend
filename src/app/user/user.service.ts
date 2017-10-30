import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string) {
    return this.http.get('http://localhost:8080/user');
  }

  saveUser(user: any) {
    return this.http.put('http://localhost:8080/user', user);
  }

}
