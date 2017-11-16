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

  letters = [];

  selectedRow: Number;

  selectedRowClient: Number;

  selectedClient: any;

  options: boolean;

  constructor(private router: Router, private clientSer: AgencyService) { }

  ngOnInit() {
    this.options = false;
    this.selectedRow = -1;
    this.selectedRowClient = -1;
    this.selectedClient = null;

    this.getLetters();
  }


  back() {
    this.router.navigate(['home']);
  }

  viewDetails() {
    this.router.navigate(['client', this.selectedClient.id]);
  }

  /**
   * Generate a list of letters
   */
  getLetters() {
    for(let i=65; i<91; i++) {
      this.letters.push(String.fromCharCode(i));
    }
  }

  showAgenciesWithLetter(letter: string, index: Number) {
    this.selectedRow = index;
    this.selectedRowClient = -1;
    this.clientSer.findByStartingLetter(letter)
    .subscribe(
      data => {
        this.agencies = data;
      },
      err => {
        console.log('Something went wrong: ' + err.error.message);
      })
  }

  showOptions(client: any, index: Number) {
    this.options = true;
    this.selectedRowClient = index;
    this.selectedClient = client;
  }
}
