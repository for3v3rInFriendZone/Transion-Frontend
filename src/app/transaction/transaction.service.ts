import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TransactionService {

  constructor(private http:HttpClient) { }

  getTransactionsFromAgency(idClient: string, type: string) {
    let params = new HttpParams();
    params = params.append('typeOfTransactons', type);

    return this.http.get('http://localhost:8080/transaction/client/'+ idClient, {params: params});
  }

}
