import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MappingService {

  constructor(private http:HttpClient) { }

  getAllMappings() {
    return this.http.get('http://localhost:8080/mapping');
  }

}
