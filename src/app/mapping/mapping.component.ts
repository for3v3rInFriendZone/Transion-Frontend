import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MappingService} from './mapping.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css'],
  providers: [MappingService],
  encapsulation: ViewEncapsulation.None
})
export class MappingComponent implements OnInit {

  showTable: boolean;
  mappings: any = [];
  mapping: any = {};
  error: string;
  success: string;
  selectedRow: Number;
  details: boolean;

  constructor(private router:Router, private mappingSer: MappingService) { }

  ngOnInit() {
    this.selectedRow = -1;
    this.details = false;

    this.getAll();
  }

  back() {
    this.router.navigate(['home']);
  }

  getAll() {
    this.mappingSer.getAllMappings()
    .subscribe(
      data => {
        this.mappings = data;
        if(this.mappings.length > 0) {
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      }); 
  }

  showDetails(mapping: any, index: Number) {
    this.mapping = mapping;
    this.details = true;
    this.selectedRow = index;
  }

}
