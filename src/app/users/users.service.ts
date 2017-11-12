import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(logedUser: string) {
    let params = new HttpParams();
    params = params.append('logedUser', logedUser);

    return this.http.get('http://localhost:8080/user/notLoged', {params: params});
  }

  saveUser(user: any){
    return this.http.post('http://localhost:8080/user', user);
  }

  deleteUser(userId: Number) {
    return this.http.delete('http://localhost:8080/user/' + userId);
  }

}
