import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import { setTimeout } from 'timers';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styles: [require('./login.component.css').toString()],
    providers: [AuthService]
})

export class LoginComponent implements OnInit {
    
    model: any;
    msgs: Message[];

    constructor(private router: Router, public authSer: AuthService) { }

    ngOnInit() { 
        this.authSer.logout();
        this.model = {};
        this.msgs = [];
    }

    login() {
        this.authSer.login(this.model.username, this.model.password)
        .subscribe( result => {
            if(result == true) {
                this.msgs.push({severity:'success', summary:'Logovanje uspešno', detail:'Uspešno ste se ulogovali.'});
                setTimeout(() => {  
                    this.router.navigate(['početna']);
                  }, 1500);
            }
        },
        err => {
            this.msgs.push({severity:'error', summary:'Greška', detail:'Kredencijali pogrešni, probajte ponovo.'});
        });
        
    }
}