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
  tableFlag: boolean;
  newEditFlag: boolean;
  mappings: any = [];
  mapping: any = {};
  error: string;
  success: string;
  selectedRow: Number;
  details: boolean;
  droppedItems: any = [];
  mappingFields: any = [];

  constructor(private router:Router, private mappingSer: MappingService) { }

  ngOnInit() {
    this.selectedRow = -1;
    this.newEditFlag = false;
    this.tableFlag = true;
    this.details = false;

    this.getAll();
  }

  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
  }

  back() {
    if(this.tableFlag) {
      this.router.navigate(['home']);
    } else if(this.newEditFlag) {
      this.newEditFlag = false;
      this.tableFlag = true;
    }
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

  newMapping() {
    this.newEditFlag = true;
    this.mapping = {};
    this.tableFlag = false;
    this.selectedRow = -1;
    this.details = false;
  }

  editMapping() {
    this.newEditFlag = true;
    this.tableFlag = false;
    this.getAllFields();
  }

  getAllFields() {
    this.mappingSer.getAllFields(this.mapping)
    .subscribe(
      data => {
        this.mappingFields = data;
      },
      err => {
        console.log('Error message: ' + err.error.message);
      });
  }

}
