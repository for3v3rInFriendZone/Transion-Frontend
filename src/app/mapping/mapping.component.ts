import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MappingService} from './mapping.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  dataSource: any;
  mappings: any;
  mapping: any = {};
  error: string;
  success: string;
  info: string;
  deleteInfo: string;
  selectedRow: Number;
  details: boolean;
  droppedItems: any = [];
  mappingsType: string[];
  displayedColumns: any = [];
  /**
   * These are required fields.
   */
  mappingFields: any = [];
  /**
   * Rest of the fields.
   */
  availableFields: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router, private mappingSer: MappingService) { }

  ngOnInit() {
    this.selectedRow = -1;
    this.newFlag = false;
    this.editFlag = false;
    this.tableFlag = true;
    this.details = false;
    this.success = null;
    this.info = null;
    this.error = null;
    this.deleteInfo = null;
    this.mappingsType = ['CLIENT', 'TRANSACTION'];
    this.displayedColumns = ['id', 'type', 'label'];

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

  onTypeChange(type: any) {
    this.mappingSer.checkIfMappingExists(type.type)
    .subscribe(
      data => {
        if(data) {
          this.info = 'This type of mapping already exists.';
        } else {
          this.info = null;
          this.getAllFieldsByMappingType(type.type);
        }
      }); 
  }

  getAllFieldsByMappingType(type: string) {
    this.availableFields = [];
    this.mappingFields = [];
    this.mappingSer.getFiledsByRequired('FALSE', type)
    .subscribe(
      data => {
        this.availableFields = data;
      });
      this.mappingSer.getFiledsByRequired('TRUE', type)
    .subscribe(
      data => {
        this.mappingFields = data;
      });
  }

  getAvaliableFields() {
    this.mappingSer.getAllFieldsByMappingTypeAvalaible(this.mapping.type)
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
        this.mappings = new MatTableDataSource(data);
        this.mappings.paginator = this.paginator;
        this.mappings.sort = this.sort;
        if(data.length > 0) {
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      }); 
  }

  showDetails(mapping: any) {
    this.mapping = mapping;
    this.details = true;
    this.selectedRow = mapping.id;
  }

  newMapping() {
    this.newFlag = true;
    this.editFlag = false;
    this.mapping = {};
    this.availableFields = [];
    this.mappingFields = [];
    this.tableFlag = false;
    this.selectedRow = -1;
    this.details = false;
    this.info = null;
  }

  editMapping() {
    this.editFlag = true;
    this.info = null;
    this.newFlag = false;
    this.tableFlag = false;
    this.getAvaliableFields();
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
          this.ngOnInit();
        }, 1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      });
  }

  updateMapping() {
    this.mapping.fields = this.mappingFields;
    this.mappingSer.updateMapping(this.mapping)
    .subscribe(
      data => {
        this.success = 'Mapping has been saved sucessfully.';
        setTimeout(() => {  
          this.ngOnInit();
        }, 1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      });
  }

  removeMapping() {
    this.mappingSer.deleteMapping(this.mapping.id)
    .subscribe(
      data => {
        this.deleteInfo = 'Mapping has been successfully removed.';
        setTimeout(() => {  
          this.ngOnInit();
        }, 1500);
      },
      err => {
        this.error = 'Something went wrong: ' + err.error.message;
      }
    ) 
  }

}
