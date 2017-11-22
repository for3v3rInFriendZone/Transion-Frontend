import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MappingService {

  constructor(private http:HttpClient) { }

  getAllMappings() {
    return this.http.get('http://localhost:8080/mapping');
  }

  getAllFields(mapping: any) {
    return this.http.post('http://localhost:8080/field/mapping', mapping);
  }

  getAllFieldsByMappingType(type: string) {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get('http://localhost:8080/field/mappingType', {params: params}); 
  } 

  /*
  getRequiredFileds(required: string) {
    let params = new HttpParams();
    params = params.append('required', required);
    return this.http.get('http://localhost:8080/field/required', {params: params});
  }

  getNotRequiredFileds(required: string) {
    let params = new HttpParams();
    params = params.append('required', required);
    return this.http.get('http://localhost:8080/field/required', {params: params});
  }
  */
}
