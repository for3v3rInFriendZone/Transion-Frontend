import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImportService } from './import.service';
import { MappingService } from '../mapping/mapping.service';
import { DataSource } from '@angular/cdk/collections';
import { ImportDataSource } from './import.dataSource';
import { Import} from './import';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  providers: [ImportService, MappingService],
  encapsulation: ViewEncapsulation.None
})
export class ImportComponent implements OnInit {

  showTable: boolean;
  dataSource: any;
  tableFlag: boolean;
  imports: any;
  import: any = {};
  selectedRow: number;
  newFlag: boolean;
  mappingsType: any = [];
  displayedColumns: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private importSer: ImportService, private mappingSer: MappingService) { }

  ngOnInit() {
    this.getAll();
    this.tableFlag = true;
    this.newFlag = false;
    this.selectedRow = -1;
    this.displayedColumns = ['id', 'mapping', 'createdOn', 'lineNumber'];
  }

  back() {
    if(this.newFlag) {
      this.ngOnInit();
    } else {
      this.router.navigate(['home']);
    }
  }

  getAll() {
    this.importSer.getAll()
    .subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  showDetails(selectedImport: any) {
    this.import = selectedImport;
    this.selectedRow = selectedImport.id;
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
    this.importSer.importFile(file, this.import.mapping.id)
    .subscribe(
      data => {
        console.log('Success!');
      },
      err => {
        console.log('Error with message: ' + err.error.message);
      });
  }

}
