import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styles: [require('./login.component.css').toString()]
})

export class LoginComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    login() {
        this.router.navigate(['list']);
    }
}