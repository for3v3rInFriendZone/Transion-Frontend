import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class DataService {
    private url = "https://jsonplaceholder.typicode.com/posts";

    constructor(private http: Http) { }

    getPosts() {
        return this.http.get(this.url).map((res) => { 
            return res.json();
        });
    }
}