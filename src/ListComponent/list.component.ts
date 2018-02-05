import { Component, OnInit } from '@angular/core';

import { DataService } from "../services/data.service";

@Component({
    selector: 'lcomp',
    templateUrl: 'list.component.html',
    styles: [require('./list.component.css').toString()],
    providers: [DataService]
})

export class ListComponent implements OnInit {
    posts: any[];
    data: any;

    constructor(private dService: DataService) { }

    ngOnInit() {
        this.dService.getPosts().subscribe(results => {
            this.posts = results;
        });
        this.data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6385",
                        "#36A2EC",
                        "#FFCE57"
                    ]
                }]    
            };
    }
}