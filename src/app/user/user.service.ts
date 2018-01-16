import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);

    return this.http.get('http://localhost:8080/user/username/', {params: params});
  }

  saveUser(user: any) {
    return this.http.put('http://localhost:8080/user', user);
  }

}
