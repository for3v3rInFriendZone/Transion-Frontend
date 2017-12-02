import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ImportService } from './import.service';
import { MappingService } from '../mapping/mapping.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  providers: [ImportService, MappingService],
  encapsulation: ViewEncapsulation.None
})
export class ImportComponent implements OnInit {

  showTable: boolean;
  tableFlag: boolean;
  imports: any = [];
  import: any = {};
  selectedRow: number;
  newFlag: boolean;
  mappingsType: any = [];

  constructor(private router: Router, private importSer: ImportService, private mappingSer: MappingService) { }

  ngOnInit() {
    this.getAll();
    this.tableFlag = true;
    this.newFlag = false;
    this.selectedRow = -1;
  }

  back() {
    this.router.navigate(['home']);
  }

  getAll() {
    this.importSer.getAll()
    .subscribe(
      data => {
        this.imports = data;
        if(this.imports.length > 0) {
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
  }

  showDetails(selectedImport: any, index: number) {
    this.import = selectedImport;
    this.selectedRow = index;
  }

  newImport() {
    this.showTable = false;
    this.newFlag = true;
    this.tableFlag = false;
    this.getAllMappings();
  }

  getAllMappings() {
    this.mappingSer.getAllMappings()
    .subscribe(
      data => {
        this.mappingsType = data;
      });
  }

  importFile(event: any) {
    var file = event.srcElement.files[0];

    this.importSer.importFile(file, this.import.mapping)
    .subscribe(
      data => {
        console.log('Success!');
      },
      err => {
        console.log('Error with message: ' + err.error.message);
      });
  }

}
