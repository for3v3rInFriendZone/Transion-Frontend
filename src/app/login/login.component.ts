import { Component, OnInit } from '@angular/core';
import { LoginService} from './login.service';
import { UserLogin } from './user';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginSer: LoginService) { }

  ngOnInit() {
    this.loginSer.getData(); 
  }

  signIn(username: string, password: string) {
    let user = new UserLogin(username, password);
    this.loginSer.loginUser(user);
  }

}
