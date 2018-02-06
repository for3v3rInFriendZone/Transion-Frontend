import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'root',
    templateUrl: './root.component.html',
    styles: [require('./root.component.css').toString()],
})
export class RootComponent {
    constructor(private router: Router) {}
}