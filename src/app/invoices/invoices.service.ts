import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get('http://localhost:8080/client');
  }

  saveInvoice(invoice: any) {
    return this.http.post('http://localhost:8080/invoice', invoice);
  }

}
