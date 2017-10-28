import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgencyService {

  constructor(private http: HttpClient) { }

  getAgencies() {
    return this.http.get('http://localhost:8080/client');
  }

}
