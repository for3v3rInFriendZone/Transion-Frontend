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

  getAllFieldsByMappingTypeAvalaible(type: string) {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get('http://localhost:8080/field/mappingType', {params: params}); 
  } 

  getAllFieldsByMappingTypeNotRequired(type: string) {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get('http://localhost:8080/field/mappingType', {params: params}); 
  }

  saveMapping(mapping: any) {
    return this.http.post('http://localhost:8080/mapping', mapping);
  }

  updateMapping(mapping: any) {
    return this.http.put('http://localhost:8080/mapping', mapping);
  }
  
  getFiledsByRequired(required: string, type: string) {
    let params = new HttpParams();
    params = params.append('required', required).append('type', type);
    return this.http.get('http://localhost:8080/field/required', {params: params});
  }
  
  checkIfMappingExists(type: string) {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get('http://localhost:8080/mapping/checkMapping', {params: params});
  }

  deleteMapping(id: number) {
    return this.http.delete('http://localhost:8080/mapping/' + id);
  }
  
}
