import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:8080/item');
  }

  getAllItemsByClient(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);

    return this.http.get('http://localhost:8080/item/client', {params: params});
  }

  getMeasures() {
    return this.http.get('http://localhost:8080/measure');
  }

}
