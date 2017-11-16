import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AgencyService {

  constructor(private http: HttpClient) { }

  getAgencies() {
    return this.http.get('http://localhost:8080/client');
  }

  findByStartingLetter(letter: string) {
    let params = new HttpParams();
    params = params.append('letter', letter);

    return this.http.get('http://localhost:8080/client/letter', {params: params});
  }

}
