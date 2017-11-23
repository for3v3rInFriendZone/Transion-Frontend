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
  newFlag: boolean;
  editFlag: boolean;
  mappings: any = [];
  mapping: any = {};
  error: string;
  success: string;
  selectedRow: Number;
  details: boolean;
  droppedItems: any = [];
  /**
   * These are required fields.
   */
  mappingFields: any = [];
  /**
   * Rest of the fields.
   */
  availableFields: any = [];

  constructor(private router:Router, private mappingSer: MappingService) { }

  ngOnInit() {
    this.selectedRow = -1;
    this.newFlag = false;
    this.editFlag = false;
    this.tableFlag = true;
    this.details = false;
    this.success = null;
    this.error = null;

    this.getAll();
  }

  editFields(e: any) {
    if(this.mappingFields.indexOf(e.dragData) == -1) {
      this.mappingFields.push(e.dragData);
      this.availableFields.splice(this.availableFields.indexOf(e.dragData), 1);
    } 
  }

  cancelDrop(e: any) {
    if(e.dragData.required) {
      return;
    }
    if(this.availableFields.indexOf(e.dragData) == -1) {
      this.availableFields.push(e.dragData);
      this.mappingFields.splice(this.mappingFields.indexOf(e.dragData), 1);
    } 
  }

  onTypeChange(type: string) {
    this.getAllFieldsByMappingType(type);
  }

  getAllFieldsByMappingType(type: string) {
    this.availableFields = [];
    this.mappingFields = [];
    this.mappingSer.getAllFieldsByMappingTypeAvalaible(type)
    .subscribe(
      data => {
        this.availableFields = data;
      });
  }

  back() {
    if(this.tableFlag) {
      this.router.navigate(['home']);
    } else if(this.newFlag) {
      this.newFlag = false;
      this.tableFlag = true;
    } else if(this.editFlag) {
      this.editFlag = false;
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
    this.newFlag = true;
    this.mapping = {};
    this.tableFlag = false;
    this.selectedRow = -1;
    this.details = false;
  }

  editMapping() {
    this.editFlag = true;
    this.tableFlag = false;
    this.getAllFieldsByMappingType(this.mapping.type);
    this.mappingFields = this.mapping.fields;
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

  saveMapping() {
    this.mapping.fields = this.mappingFields;
    this.mappingSer.saveMapping(this.mapping)
    .subscribe(
      data => {
        this.success = 'Mapping has been saved sucessfully.';
        setTimeout(() => {  
          this.editFlag = false;
          this.newFlag = false;
          this.tableFlag = true;
          this.ngOnInit();
        }, 1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      });
  }

  /*
  getRequiredFields(required: string) {
    return this.mappingSer.getRequiredFileds(required);
  }

  getNotRequiredFileds(required: string) {
    return this.mappingSer.getNotRequiredFileds(required);
  }
  */
}
