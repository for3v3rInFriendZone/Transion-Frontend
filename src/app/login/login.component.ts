import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services/authentication.service';
import { UserLogin } from '../_models/user';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  model: any = {};
  error = '';

  constructor(
    private loginSer: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginSer.logout();
  }

  login() {
    this.loginSer.login(this.model.username, this.model.password)
    .subscribe( result => {
      console.log(result);
      if( result == true) {
        this.router.navigate(['home']);
      }
    });
    this.error = 'Username or password is incorrect';
  }

}
