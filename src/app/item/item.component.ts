import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemService } from './item.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  items: any = [];
  item: any = {};
  measures: any = [];
  taxes: any = [];
  selectedRow: number;
  tableFlag: boolean;
  newItemFlag: boolean;
  editItemFlag: boolean;
  warranties: any = [];
  supplier: any = {};
  search: boolean;
  tempItemsForFilter: any = [];
  paginatorValue: number;

  constructor(private router: Router, private itemSer: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllItemsByClient();
    this.getMeasures();
    this.getTaxes();
    this.paginatorValue = 0;
    this.selectedRow = -1;
    this.tableFlag = true;
    this.newItemFlag = false;
    this.editItemFlag = false;
    this.warranties = [6, 12, 18];
  }

  back() {
    if(this.tableFlag) {
      this.router.navigate(['home']);
    } else {
      this.tableFlag = true;
      this.newItemFlag = false;
      this.editItemFlag = false;
    }
  }

  getAllItemsByClient() {
    this.itemSer.getAllItemsByClient(JSON.parse(localStorage.getItem('currentUser')).username)
    .subscribe(
      data => {
        this.items = data;
        this.items = this.items.slice(0, 10);
        this.tempItemsForFilter = data;
        this.supplier = this.items[0].supplier; //it's always the same supplier for those items.
      });
  }

  getMeasures() {
    this.itemSer.getMeasures()
    .subscribe(
      data => {
        this.measures = data;
      });
  }

  getTaxes() {
    this.itemSer.getTaxes()
    .subscribe(
      data => {
        this.taxes = data;
      });
  }

  showDetails(selectedItem: any, index: number) {
    this.item = selectedItem;
    this.selectedRow = index;
  }

  nextPage(value: number) {
    this.items = this.tempItemsForFilter.slice(this.paginatorValue, this.paginatorValue + value);
    this.paginatorValue = this.paginatorValue + value;
  }

  newItem() {
    this.tableFlag = false;
    this.newItemFlag = true;
    this.editItemFlag = false;
    this.item = {};
    this.item.externalUniqueKey = Math.random().toString(36).substring(5).toUpperCase();
    this.item.supplier = this.supplier;
  }

  editItem() {
    if(this.item.id == undefined) {
      this.snackBar.open('Pažnja: ', 'Morate izabrati artikal za izmenu.', {
        duration: 2500,
      });
      return;
    }
    this.tableFlag = false;
    this.newItemFlag = false;
    this.editItemFlag = true;
  }

  /**
   * When search toogle is off, restore previous state of table data.
   */
  searchToogle() {
    if(!this.search) {
      this.ngOnInit();
    }
  }

  saveItem() {
    this.itemSer.saveItem(this.item)
    .subscribe(
      data => {
        if(this.newItemFlag) {
          this.snackBar.open('Uspešno dodat artikal: ', this.item.externalUniqueKey, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        } else {
          this.snackBar.open('Uspešno izmenjen artikal: ', this.item.externalUniqueKey, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
        this.snackBar.open('Dogodila se greška: ', err.error.message, {
          duration: 2000,
        });
        setTimeout(() => { 
          this.ngOnInit();
        }, 2000);
    });
  }

  removeItem() {
    if(this.item.id == undefined) {
      this.snackBar.open('Pažnja', 'Morate izabrati artikal za brisanje', {
        duration: 2500,
      });
    } else {
      this.itemSer.removeItem(this.item.id)
      .subscribe(
        data => {
          this.snackBar.open('Uspešno je obrisan artikal: ',this.item.externalUniqueKey, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        },
        err => {
          this.snackBar.open('Dogodila se greška: ', err.error.message, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        });
    }
  }

  /**
   * Required for predefined value for select tag
   * @param item1 
   * @param item2 
   */
  byId(item1: any, item2: any) {
    if(item1 == null || item2 == null) {
      return;
    }
    return item1.id === item2.id;
  }

  applyFilter(filterValue: any) {
    if(filterValue === "" || filterValue === null || filterValue === undefined) {
      this.ngOnInit();
    }
    let filter = filterValue.toString().trim().toLowerCase();
    this.items = this.tempItemsForFilter.filter(function cf(object: any) {
      if(object.externalUniqueKey.toString().trim().toLowerCase().indexOf(filter) !== -1) {
        return object;
      } else if(object.name.toString().trim().toLowerCase().indexOf(filter) !== -1) {
        return object;
      } else if(object.supplier.name.toString().trim().toLowerCase().indexOf(filter) !== -1) {
        return object;
      }
    });
  }

  applyFilterOption(filterValue: any) {
    if(filterValue === "" || filterValue === null || filterValue === undefined) {
      this.ngOnInit();
    }
    let filter = filterValue.toString().trim().toLowerCase();
    this.items = this.tempItemsForFilter.filter(function cf(object: any) {
      if(object.warranty != null) {
        if(object.warranty.toString().trim().toLowerCase().indexOf(filter) !== -1) {
          return object;
        }
      }
      if(object.measure.name.toString().trim().toLowerCase().indexOf(filter) !== -1) {
        return object;
      }
    });
  }

}
