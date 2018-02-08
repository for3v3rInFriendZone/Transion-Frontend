import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class InvoicesService {

    constructor(private http: HttpClient) { }

    getItems() {
        return this.http.get("http://localhost:8080/item");
    }
}