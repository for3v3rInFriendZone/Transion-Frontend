import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionService {

  constructor(private http:HttpClient) { }

  getTransactionsFromAgency(id: number) {
    return this.http.get('http://localhost:8080/client/:id', id);
  }

}
