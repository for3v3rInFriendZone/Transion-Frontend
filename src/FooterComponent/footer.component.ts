import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: 'footer.component.html',
    styles: [require('./footer.component.css').toString()]
})

export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}