import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgenciesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHome() {
    this.router.navigate(['home']);
  }

}
