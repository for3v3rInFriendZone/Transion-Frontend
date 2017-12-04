import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ImportService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:8080/import');
  }

  importFile(file: any, mapping: string) {
    let params = new HttpParams();
    params = params.append('mapping', mapping);
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:8080/import', formData, {params: params});
  }

}
