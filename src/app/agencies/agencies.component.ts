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

  /**
   *  Show details buttons
   */ 
  showDetails: boolean = false;
  /**
   * Show agencies table
   */
  showTable: boolean = true;
  /**
   * After clicking one row in table and after selecting Details button
   */ 
  agencyDetails: boolean = false;

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

  back() {
    this.router.navigate(['home']);
  }

  viewDetails(agency: any) {
    this.router.navigate(['agency', agency.id]);
  }
}
