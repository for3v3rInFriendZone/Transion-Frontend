import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class InvoicesService {

    constructor(private http: Http) { }

    getItems() {
        return this.http.get("http://localhost:8080/item").map((res) => { 
            return res.json();
        });
    }
}