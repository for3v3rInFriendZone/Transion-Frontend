import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyService } from './agency.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css'],
  providers: [AgencyService],
  encapsulation: ViewEncapsulation.None
})
export class AgenciesComponent implements OnInit {

  showDetails: boolean = false;
  rowClicked: boolean = false;
  agencies: any = [];

  constructor(private router: Router, private clientSer: AgencyService) { }

  ngOnInit() {
    this.clientSer.getAgencies()
    .subscribe(
      data => {
        this.agencies = data;
      },
      err => {
        console.log('Something went wrong: ' + err.error.message);
      });
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  viewDetails() {
    this.showDetails = true;
    this.rowClicked = true;
  }

}
